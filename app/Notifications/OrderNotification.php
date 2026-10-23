<?php

namespace App\Notifications;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ReturnRequest;
use App\Models\OrderStatusList;
use App\Models\ReturnStatusList;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class OrderNotification extends Notification
{
    use Queueable;
    public $order_id;
    public $type;

    public function __construct($order_id, $type)
    {
        $this->order_id = $order_id;
        $this->type = $type;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Build the array stored in panel_notifications (in-app only; panel push templates removed).
     */
    public function toArray($notifiable)
    {
        // Auto-assign gave up (no driver accepted / none available): say so plainly instead of
        // falling through to the generic "Order #N <status>" text, which looks like a normal update.
        if ($this->type == 'auto_assign_failed') {
            return [
                'type' => 'auto_assign_failed',
                'order_id' => $this->order_id,
                'text' => "No delivery boy accepted order #" . $this->order_id . ". Please assign a delivery boy manually.",
            ];
        }

        if ($this->type == 'order_assign') {
            if ($notifiable->role_id == 4) {
                $text = "You have been assigned order #" . $this->order_id;
            } else {
                $text = "Order #" . $this->order_id . " has been assigned to a delivery partner";
            }
            return ['type' => 'order_assign', 'order_id' => $this->order_id, 'text' => $text];
        }

        // Panel notification when customer submits a return request (for seller and admin).
        if ($this->type == 'return_request_new') {
            $order_item = OrderItem::where('id', $this->order_id)->first();
            if ($order_item) {
                $returnRequest = ReturnRequest::where('order_item_id', $order_item->id)->first();
                $order_id = $returnRequest ? $returnRequest->order_id : $order_item->order_id;
                $text = "You have return request for order #" . $order_id;
                return [
                    'type'             => 'return_request_new',
                    'order_id'         => $order_id,
                    'order_item_id'    => $order_item->id,
                    'return_request_id' => $returnRequest ? $returnRequest->id : null,
                    'text'             => $text,
                ];
            }
        }

        if ($this->type == 'order_item_status_update' || $this->type == 'return_request_sent' || $this->type == 'return_request_status') {
            $order_item = OrderItem::with('user')->where('id', $this->order_id)->first();
            if ($order_item) {
                $orderStatusList = OrderStatusList::where('id', $order_item->active_status)->first();
                $status_name = $orderStatusList ? $orderStatusList->status : '';
                $placeholders = [
                    'product_name'  => $order_item->product_name ?? '',
                    'variant_name'  => $order_item->variant_name ?? '',
                    'status_name'   => $status_name,
                    'order_id'      => $order_item->order_id ?? '',
                ];
                if ($this->type == 'return_request_status') {
                    $returnRequest = ReturnRequest::where('order_item_id', $order_item->id)->first();
                    if ($returnRequest) {
                        if ($returnRequest->status == ReturnStatusList::$rPending) {
                            $placeholders['status_name'] = ReturnStatusList::$requestPending;
                        } elseif ($returnRequest->status == ReturnStatusList::$rApproved) {
                            $placeholders['status_name'] = ReturnStatusList::$requestApproved;
                        } elseif ($returnRequest->status == ReturnStatusList::$rRejected) {
                            $placeholders['status_name'] = ReturnStatusList::$requestRejected;
                        }
                    }
                }
                $text = $placeholders['product_name'] . ' - ' . $placeholders['variant_name'] . ' ' . $placeholders['status_name'] . ' ' . __('order') . ' #' . $placeholders['order_id'];
                return ['type' => $this->type, 'order_id' => $order_item->order_id, 'order_item_id' => $order_item->id, 'text' => $text];
            }
        } else {
            $order = Order::with('user')->where('id', $this->order_id)->first();
            if ($order) {
                $orderStatusList = OrderStatusList::where('id', $order->active_status)->first();
                $status_name = $orderStatusList ? $orderStatusList->status : '';
                $text = "Order #" . $order->id . " " . $status_name;
                return ['type' => $this->type, 'order_id' => $order->id, 'text' => $text];
            }
        }
        return ['type' => $this->type, 'order_id' => $this->order_id, 'text' => ''];
    }
}
