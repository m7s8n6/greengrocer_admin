<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Order-offer push channel for the auto-assign delivery boy feature (plan §7). $user is
// the authenticated Admin account (auth:api, same as every delivery_boy/* route) - only
// the delivery boy this channel is named after may subscribe to it.
// Auto-assign delivery boy feature disabled
// Broadcast::channel('delivery-boy.{id}', function ($user, $id) {
//     return $user->deliveryBoy && (int) $user->deliveryBoy->id === (int) $id;
// });

// Live driver location for one order. The customer who placed the order (auth:api-customers,
// App\Models\User) and the delivery boy assigned to it (auth:api, App\Models\Admin) may
// subscribe; anyone else is rejected.
Broadcast::channel('order-tracking.{orderId}', function ($user, $orderId) {
    // withoutGlobalScopes: the module scope follows the X-Module-Id header, so an order from another
    // module than the one the app currently sends would look "not found" and be refused.
    $order = \App\Models\Order::withoutGlobalScopes()->find($orderId);
    if (!$order) {
        return false;
    }
    if ($user instanceof \App\Models\User) {
        return (int) $order->user_id === (int) $user->id;
    }
    return $user->deliveryBoy && (int) $order->delivery_boy_id === (int) $user->deliveryBoy->id;
}, ['guards' => ['api', 'api-customers']]);
