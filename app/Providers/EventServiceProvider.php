<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        if (!file_exists(storage_path('installed'))) {
            return;
        }

        try {
            // Skip if settings table doesn't exist (e.g. during install/re-install)
            if (!Schema::hasTable('settings')) {
                return;
            }
            $timezone = DB::table('settings')->where('variable', 'system_timezone')->first();

            // Set the timezone in the application configuration
            if (isset($timezone) && $timezone->value != " " && $timezone->value != null) {
                Config::set('app.timezone', $timezone->value);
                date_default_timezone_set($timezone->value);
            }

            $this->configureBroadcasting();
        } catch (\Throwable $e) {
            // Database/table not ready (e.g. during install) - use default timezone
        }
    }

    /**
     * Realtime settings page (admin) picks Pusher or Reverb and stores credentials in the
     * key/value `settings` table (see StoreSettingsApiController::save_realtime_setting).
     * Only override Laravel's default `null` broadcasting driver once the admin has
     * actually saved real, non-empty credentials for the chosen driver - otherwise leave
     * broadcasting fully inert exactly as it is today.
     *
     * Wrapped in the same outer try/catch as the timezone block above, and the
     * whole thing is a best-effort config nudge, never a hard dependency: every place
     * that broadcasts a delivery event wraps the actual dispatch in its own try/catch too
     * (see AutoAssignDeliveryBoyService), so a missing pusher/pusher-php-server or
     * laravel/reverb composer package - neither is installed in this app today - never
     * breaks the underlying order/auto-assign flow, it just fails to push over websocket
     * and the existing FCM notification still goes through.
     */
    private function configureBroadcasting(): void
    {
        $rows = DB::table('settings')
            ->whereIn('variable', [
                'broadcast_driver',
                'pusher_app_id', 'pusher_app_key', 'pusher_app_secret', 'pusher_app_cluster',
                'reverb_app_id', 'reverb_app_key', 'reverb_app_secret', 'reverb_host', 'reverb_port', 'reverb_scheme',
            ])
            ->pluck('value', 'variable');

        if ($rows->isEmpty()) {
            return;
        }

        // Values pasted into the settings form often carry a stray space; that breaks the signature.
        $rows = $rows->map(fn ($value) => is_string($value) ? trim($value) : $value);

        $driver = $rows->get('broadcast_driver');

        if ($driver === 'pusher'
            && trim((string) $rows->get('pusher_app_key')) !== ''
            && trim((string) $rows->get('pusher_app_secret')) !== ''
            && trim((string) $rows->get('pusher_app_id')) !== ''
        ) {
            Config::set('broadcasting.default', 'pusher');
            Config::set('broadcasting.connections.pusher', [
                'driver' => 'pusher',
                'key' => $rows->get('pusher_app_key'),
                'secret' => $rows->get('pusher_app_secret'),
                'app_id' => $rows->get('pusher_app_id'),
                'options' => [
                    'cluster' => $rows->get('pusher_app_cluster'),
                    'useTLS' => true,
                ],
            ]);
        } elseif ($driver === 'reverb'
            && trim((string) $rows->get('reverb_app_key')) !== ''
            && trim((string) $rows->get('reverb_app_secret')) !== ''
            && trim((string) $rows->get('reverb_app_id')) !== ''
        ) {
            Config::set('broadcasting.default', 'reverb');
            Config::set('broadcasting.connections.reverb', [
                'driver' => 'pusher',
                'key' => $rows->get('reverb_app_key'),
                'secret' => $rows->get('reverb_app_secret'),
                'app_id' => $rows->get('reverb_app_id'),
                'options' => [
                    'host' => $rows->get('reverb_host'),
                    'port' => (int) ($rows->get('reverb_port') ?: 443),
                    'scheme' => $rows->get('reverb_scheme'),
                    'useTLS' => $rows->get('reverb_scheme') === 'https',
                ],
            ]);
        }
        // Neither driver has usable credentials yet -> leave broadcasting.default as
        // whatever config/broadcasting.php already resolves to (BROADCAST_DRIVER env,
        // 'null' by default) - identical to today's behaviour.
    }
}