<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Services\ThemeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ThemeApiController extends Controller
{
    private ThemeService $theme;

    public function __construct(ThemeService $theme)
    {
        $this->theme = $theme;
    }

    /**
     * Module is resolved from the admin SPA's X-Module-Id header (sent automatically on every
     * request per the app's active module switcher) when present, else the ?module_id= query/
     * form param an external client can pass explicitly, else module 1 (Grocery) - so an
     * existing external caller that sends neither keeps getting the same global palette as
     * before this feature existed.
     */
    private function resolveModuleId(Request $request): int
    {
        $moduleId = (int) ($request->header('X-Module-Id') ?? $request->input('module_id') ?? 1);

        return $moduleId > 0 ? $moduleId : 1;
    }

    /**
     * True when the hex color is lighter than #9E9E9E (perceived luma > 158) - the floor for a
     * neutral that still reads as a visible border/divider rather than disappearing into a
     * white surface.
     */
    private function isTooLight(string $hex): bool
    {
        $hex = ltrim($hex, '#');
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));
        $luma = ($r * 299 + $g * 587 + $b * 114) / 1000;

        return $luma > 158;
    }

    /**
     * Public — every module's full palette payload in one response, keyed by module id, so a
     * client with several modules (or the admin panel switching between them) never needs a
     * second request just to read a different module's colors. Fetched by web/app only when
     * theme_updated_at differs from their cached value.
     */
    public function index()
    {
        $modules = \App\Models\Module::orderBy('id')->get(['id', 'name', 'slug', 'is_default']);

        $data = [];
        foreach ($modules as $module) {
            $payload = $this->theme->buildThemePayload($module->id, (bool) $module->is_default);
            $payload['module_id'] = $module->id;
            $payload['module_name'] = $module->name;
            $payload['module_slug'] = $module->slug;
            $payload['module_is_default'] = (bool) $module->is_default;
            $data[$module->id] = $payload;
        }

        return CommonHelper::responseWithData($data, count($data));
    }

    /**
     * Admin — update primary + neutral seeds.
     * Regenerates the 11-stop palettes and bumps theme_updated_at.
     */
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'light_seed_primary' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'light_seed_neutral' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Neutral drives text/border/divider colors app-wide - a near-white pick (e.g. the
        // #FFFFFF default) makes borders/dividers invisible against a white surface. Block it
        // rather than let it save silently broken.
        if ($this->isTooLight($request->light_seed_neutral)) {
            return CommonHelper::responseError(__('neutral_color_too_light_warning'));
        }

        $moduleId = $this->resolveModuleId($request);

        $this->theme->putSetting('light_seed_primary', $request->light_seed_primary, $moduleId);
        $this->theme->putSetting('light_seed_neutral', $request->light_seed_neutral, $moduleId);

        $this->theme->putSetting('light_primary_palette', json_encode($this->theme->generatePalette($request->light_seed_primary)), $moduleId);
        $this->theme->putSetting('light_neutral_palette', json_encode($this->theme->generateNeutralPalette($request->light_seed_neutral)), $moduleId);

        $this->theme->touchThemeUpdatedAt($moduleId);

        return CommonHelper::responseSuccessWithData(__('theme_updated_successfully'), $this->theme->buildThemePayload($moduleId));
    }

    /**
     * Admin — update a single resettable status color (success/error/warn/info).
     */
    public function saveStatusColor(Request $request, string $type)
    {
        if (!in_array($type, ThemeService::STATUS_TYPES, true)) {
            return CommonHelper::responseError(__('invalid_status_color_type'));
        }

        $validator = Validator::make($request->all(), [
            'seed' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $moduleId = $this->resolveModuleId($request);

        $this->theme->putSetting("{$type}_seed", $request->seed, $moduleId);
        $this->theme->putSetting("{$type}_palette", json_encode($this->theme->generatePalette($request->seed)), $moduleId);
        $this->theme->touchThemeUpdatedAt($moduleId);

        return CommonHelper::responseSuccessWithData(__('status_color_updated_successfully'), $this->theme->buildThemePayload($moduleId));
    }

    /**
     * Admin — reset a status color back to the system default.
     */
    public function resetStatusColor(Request $request, string $type)
    {
        if (!in_array($type, ThemeService::STATUS_TYPES, true)) {
            return CommonHelper::responseError(__('invalid_status_color_type'));
        }

        $moduleId = $this->resolveModuleId($request);

        $this->theme->deleteSetting("{$type}_seed", $moduleId);
        $this->theme->deleteSetting("{$type}_palette", $moduleId);
        $this->theme->touchThemeUpdatedAt($moduleId);

        return CommonHelper::responseSuccessWithData(__('status_color_reset_successfully'), $this->theme->buildThemePayload($moduleId));
    }
}
