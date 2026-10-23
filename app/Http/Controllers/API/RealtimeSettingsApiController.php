<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

/**
 * Admin "Realtime Settings" page - choose Pusher (cloud) or Reverb (self-hosted) for
 * websocket broadcasting, used to push order-offer alerts to drivers for the auto-assign
 * delivery boy feature (docs/auto-assign-delivery-boy-plan.md). Saving here alone does
 * NOT make broadcasting functional - see EventServiceProvider::configureBroadcasting()
 * for how these get applied, and note neither pusher/pusher-php-server nor
 * laravel/reverb composer packages are installed in this app yet.
 */
class RealtimeSettingsApiController extends Controller
{
    private const VARIABLES = [
        'broadcast_driver',
        'pusher_app_id',
        'pusher_app_key',
        'pusher_app_secret',
        'pusher_app_cluster',
        'reverb_app_id',
        'reverb_app_key',
        'reverb_app_secret',
        'reverb_host',
        'reverb_port',
        'reverb_scheme',
    ];

    public function index()
    {
        $rows = Setting::whereIn('variable', self::VARIABLES)->pluck('value', 'variable');

        $data = [];
        foreach (self::VARIABLES as $variable) {
            $data[$variable] = $rows->get($variable, '');
        }

        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            if (!in_array($key, self::VARIABLES, true)) {
                continue;
            }

            $value = $value ?? '';
            $setting = Setting::where('variable', $key)->first();
            if ($setting) {
                $setting->value = $value;
                $setting->save();
            } else {
                Setting::create(['variable' => $key, 'value' => $value]);
            }
        }

        return CommonHelper::responseSuccess('realtime_settings_saved_successfully');
    }
}
