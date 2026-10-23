<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

/**
 * Admin "Deeplink Settings" page. Values are stored as plain settings rows and exposed in the public
 * settings API under "deeplink_settings".
 */
class DeeplinkSettingsApiController extends Controller
{
    private const VARIABLES = [
        'deeplink_scheme',
    ];

    /** Block returned inside the public settings API response. */
    public static function getDeeplinkSettings(): array
    {
        $rows = Setting::whereIn('variable', self::VARIABLES)->pluck('value', 'variable');

        $data = [];
        foreach (self::VARIABLES as $variable) {
            $value = $rows->get($variable, '');
            $data[$variable] = (string) $value;
        }

        // No admin toggle: feature is on as soon as a scheme is configured.
        $enabled = $data['deeplink_scheme'] !== '' ? '1' : '0';

        return ['deeplink_enabled' => $enabled] + $data;
    }

    public function index()
    {
        $data = self::getDeeplinkSettings();
        unset($data['deeplink_enabled']);

        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request)
    {
        $values = [];
        foreach (self::VARIABLES as $variable) {
            $values[$variable] = trim((string) $request->input($variable, ''));
        }

        if ($values['deeplink_scheme'] === '') {
            return CommonHelper::responseError('Deeplink schema is required.');
        }
        if (!preg_match('/^[a-z][a-z0-9+.-]*$/', $values['deeplink_scheme'])) {
            return CommonHelper::responseError('Deeplink scheme must be lowercase, start with a letter and contain no "://".');
        }

        foreach ($values as $variable => $value) {
            $setting = Setting::where('variable', $variable)->first();
            if ($setting) {
                $setting->value = $value;
                $setting->save();
            } else {
                Setting::create(['variable' => $variable, 'value' => $value]);
            }
        }

        return CommonHelper::responseSuccess('deeplink_settings_saved_successfully');
    }
}
