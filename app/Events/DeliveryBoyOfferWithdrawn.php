<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Pushed to the K-1 drivers who did not win the offer once one driver accepts, or to a
 * driver whose offer got superseded by a manual assign (plan §7/§8). Supplementary to
 * FCM, same safety note as DeliveryBoyOrderOffered - callers must wrap dispatch in
 * try/catch.
 */
class DeliveryBoyOfferWithdrawn implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $deliveryBoyId;
    public int $orderId;

    public function __construct(int $deliveryBoyId, int $orderId)
    {
        $this->deliveryBoyId = $deliveryBoyId;
        $this->orderId = $orderId;
    }

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('delivery-boy.' . $this->deliveryBoyId);
    }

    public function broadcastAs(): string
    {
        return 'offer_withdrawn';
    }

    public function broadcastWith(): array
    {
        return [
            'order_id' => $this->orderId,
        ];
    }
}
