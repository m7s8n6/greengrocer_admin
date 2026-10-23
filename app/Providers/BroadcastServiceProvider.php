<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Default Broadcast::routes() authorizes against the web session guard - this
        // app's delivery-boy app authenticates over the API with a Bearer token
        // (auth:api, same guard every delivery_boy/* route already uses), so the
        // broadcasting auth endpoint needs that guard too or every channel subscription
        // from the driver app would be rejected.
        Broadcast::routes(['middleware' => ['auth:api']]);

        // Channel rules register on the *default* broadcaster at the moment they are loaded. The
        // Pusher/Reverb driver chosen in Realtime Settings is applied by EventServiceProvider, which
        // boots after this provider - loading the rules here put them on the old default (log/null),
        // so the real Pusher/Reverb broadcaster had none and refused every private-channel auth.
        // Waiting until all providers have booted registers them on the final driver.
        $this->app->booted(function () {
            require base_path('routes/channels.php');
        });
    }
}
