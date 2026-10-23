<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\ModuleDeliverySetting;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Admin settings page for docs/auto-assign-delivery-boy-plan.md §2/§2b - per-module
 * auto-assign tuning. Every field defaults to off/conservative at the DB level (see
 * version_4_0_2 migration), so listing/saving here never changes existing order
 * behaviour unless an admin explicitly flips auto_assign_enabled to true.
 *
 * `allow_seller_owned_fleet` was dropped as a module-level gate - which pool a seller's
 * orders use is now decided entirely per-seller via `sellers.delivery_boy_source`,
 * admin-set at registration or via Edit Seller (SellerApiController), so a second
 * module-wide switch on top of that was redundant.
 */
class ModuleDeliverySettingsApiController extends Controller
{
    public function list(Request $request)
    {
        $modules = Module::select('id', 'name')->orderBy('id')
            ->when($request->filled('module_id'), fn ($q) => $q->where('id', $request->module_id))
            ->get();

        $settingsByModule = ModuleDeliverySetting::whereIn('module_id', $modules->pluck('id'))->get()->keyBy('module_id');

        $data = $modules->map(function ($module) use ($settingsByModule) {
            $settings = $settingsByModule->get($module->id);
            return [
                'module_id' => $module->id,
                'module_name' => $module->name,
                'allow_seller_own_drivers' => Setting::sellerOwnDriversAllowed(),
                'auto_assign_enabled' => (bool) ($settings->auto_assign_enabled ?? false),
                'response_timeout_seconds' => $settings->response_timeout_seconds ?? 60,
                'max_rounds' => $settings->max_rounds ?? 4,
                'total_wait_cap_seconds' => $settings->total_wait_cap_seconds ?? 300,
                'max_concurrent_orders' => $settings->max_concurrent_orders ?? 2,
                'location_staleness_minutes' => $settings->location_staleness_minutes ?? 10,
            ];
        });

        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'module_id' => 'required|exists:modules,id',
            'auto_assign_enabled' => 'required|boolean',
            // Deliberately >= 60 - see class docblock and version_4_0_2 migration comment:
            // the only sweep mechanism today is a once-a-minute cron, not a persistent
            // worker, so a shorter timeout can't be reliably enforced yet.
            'response_timeout_seconds' => 'nullable|integer|min:60',
            'max_rounds' => 'nullable|integer|min:1',
            'total_wait_cap_seconds' => 'nullable|integer|min:1',
            'max_concurrent_orders' => 'nullable|integer|min:0',
            'location_staleness_minutes' => 'nullable|integer|min:1',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $settings = ModuleDeliverySetting::firstOrNew(['module_id' => $request->module_id]);

        $settings->auto_assign_enabled = $request->boolean('auto_assign_enabled');
        // auto_assign_trigger_status is intentionally not admin-editable - see
        // AutoAssignDeliveryBoyService::TRIGGER_STATUS, hardcoded in code instead.
        // broadcast_size / max_distance_km were dropped entirely: every on-duty candidate
        // now gets the offer at once (no top-K cap), and city/service-area selection
        // already excludes out-of-area orders before auto-assign ever runs, so a second
        // radius cutoff here was redundant.
        $settings->response_timeout_seconds = $request->response_timeout_seconds ?? $settings->response_timeout_seconds ?? 60;
        $settings->max_rounds = $request->max_rounds ?? $settings->max_rounds ?? 4;
        $settings->total_wait_cap_seconds = $request->total_wait_cap_seconds ?? $settings->total_wait_cap_seconds ?? 300;
        $settings->max_concurrent_orders = $request->max_concurrent_orders ?? $settings->max_concurrent_orders ?? 2;
        $settings->location_staleness_minutes = $request->location_staleness_minutes ?? $settings->location_staleness_minutes ?? 10;
        $settings->save();

        return CommonHelper::responseSuccess('module_delivery_settings_saved_successfully');
    }

    /**
     * Global switch, independent of the per-module auto-assign form above.
     */
    public function saveSellerOwnDrivers(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'allow_seller_own_drivers' => 'required|boolean',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        Setting::set_value('allow_seller_own_drivers', $request->boolean('allow_seller_own_drivers') ? 1 : 0);

        return CommonHelper::responseSuccess('seller_own_drivers_setting_saved_successfully');
    }
}
