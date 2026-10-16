<?php

namespace App\Http\Controllers;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderStatusList;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\WalletTransaction;
use App\Models\User;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Jobs\SendEmailJob;
use App\Models\OrderItem;

class DpoController extends Controller
{
    /**
     * DPO sends an HTTP POST to the notification URL when a payment is verified.
     * The payload includes: TransactionToken, TransactionRef, CompanyRef, TransactionFinalStatus, etc.
     *
     * CompanyRef format: order-{order_id}-{user_id}
     *                    wallet-{YmdHis}-{user_id}
     *                    subscription-{plan_id}-{user_id}
     */
    public function dpoCallback(Request $request)
    {
        $xml_content = $request->getContent();
        Log::info("DPO Callback received!", [
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'xml' => $xml_content,
            'headers' => $request->headers->all()
        ]);

        if (empty($xml_content)) {
            $notification = $request->all();
        } else {
            try {
                $xml = simplexml_load_string($xml_content);
                $notification = json_decode(json_encode($xml), true);
            } catch (\Exception $e) {
                Log::error("DPO | Error parsing XML callback: " . $e->getMessage());
                $notification = $request->all();
            }
        }

        try {
            $final_status = $notification['TransactionFinalStatus'] ?? $notification['transaction_final_status'] ?? $notification['ResultExplanation'] ?? '';
            $company_ref  = $notification['CompanyRef'] ?? $notification['company_ref'] ?? '';
            $txn_ref      = $notification['TransactionRef'] ?? $notification['transaction_ref'] ?? '';
            $txn_token    = $notification['TransactionToken'] ?? $notification['transaction_token'] ?? '';
            $amount       = $notification['TransactionAmount'] ?? $notification['transaction_amount'] ?? 0;

            if (strtolower($final_status) === 'approved' || strtolower($final_status) === 'transaction paid') {
                $this->processDpoPayment($company_ref, $txn_token, $txn_ref, $amount);
                if ($request->isMethod('post')) {
                    return response('OK', 200);
                }
                return $this->handleRedirect($company_ref, Transaction::$statusSuccess);
            } else {
                Log::warning("DPO | Payment not approved. Status: $final_status, CompanyRef: $company_ref");
                $explode = explode('-', $company_ref);
                if (!empty($explode[0]) && $explode[0] === 'order' && !empty($explode[1])) {
                    Order::where('id', $explode[1])->update(['active_status' => OrderStatusList::$cancelled]);
                }
                if ($request->isMethod('post')) {
                    return response('FAIL', 200);
                }
                return $this->handleRedirect($company_ref, Transaction::$statusFailed, $final_status);
            }

        } catch (\Exception $e) {
            Log::error("DPO | Error processing callback: " . $e->getMessage());
            return response('ERROR', 500);
        }
    }

    private function processDpoPayment($company_ref, $txn_token, $txn_ref, $amount)
    {
        $explode = explode('-', $company_ref);
        if (empty($explode[0])) return;

        if ($explode[0] === 'order') {
            $order_id = $explode[1];
            $user_id  = $explode[2];

            $order = Order::withTrashed()->where('id', $order_id)->first();
            if (!$order) return;

            // Check if transaction already exists
            $existingTransaction = Transaction::where('payu_txn_id', $txn_token)->first();
            if ($existingTransaction) {
                Log::info("DPO | Order Transaction already processed: " . $txn_token);
                return;
            }

            $transactionData = [
                'user_id'          => $user_id,
                'order_id'         => $order_id,
                'type'             => Transaction::$typeDpo,
                'txn_id'           => $txn_ref,
                'payu_txn_id'      => $txn_token,
                'amount'           => $amount,
                'status'           => Transaction::$statusSuccess,
                'message'          => 'txn_order_payment',
                'transaction_date' => now(),
            ];

            $transaction = Transaction::create($transactionData);

            $user = User::find($user_id);
            if ($order->order_type === 'selfpickup') {
                $order->active_status = OrderStatusList::$selfPickupPending;
            } else {
                $order->active_status = OrderStatusList::$received;
            }
            $order->transaction_id = $transaction->id ?? 0;

            if (isset($order->wallet_balance) && $order->wallet_balance > 0 && $user) {
                $user_wallet_balance = $user->balance;
                $new_balance = $user_wallet_balance < $order->wallet_balance ? 0 : $user_wallet_balance - $order->wallet_balance;
                CommonHelper::updateUserWalletBalance($new_balance, $user->id);
                CommonHelper::addWalletTransaction(
                    $order->id, 0, $user->id,
                    'debit', $order->wallet_balance,
                    'wallet_used_against_order_placement', 1,
                    Transaction::$paymentTypeDpo
                );
            }

            $order->save();

            $excludedStatuses = [OrderStatusList::$cancelled, OrderStatusList::$returned];
            OrderItem::where("order_id", $order->id)
                ->whereNotIn("active_status", $excludedStatuses)
                ->update(['active_status' => $order->active_status]);

            try {
                dispatch(function () use ($order) {
                    CommonHelper::sendNotificationOrderStatus($order);
                    CommonHelper::sendOrderNotificationsToAdmins($order, 'new_order', $order->delivery_boy_id ?? null);
                })->afterResponse();
                dispatch(new SendEmailJob($order))->afterResponse();
                CommonHelper::sendSmsOrderStatus($order, $order->active_status);
            } catch (\Exception $e) {
                Log::error("DPO | Post-payment processing error: " . $e->getMessage());
            }

        } elseif ($explode[0] === 'wallet') {
            $user_id = $explode[2];
            $existingTxn = WalletTransaction::where('txn_id', $txn_ref)->first();
            if ($existingTxn) return;

            $dateTime = Carbon::createFromFormat('YmdHis', $explode[1]);
            WalletTransaction::create([
                'user_id'          => $user_id,
                'order_id'         => '',
                'type'             => 'credit',
                'payment_type'     => Transaction::$paymentTypeDpo,
                'txn_id'           => $txn_ref,
                'amount'           => $amount,
                'status'           => Transaction::$statusSuccess,
                'message'          => 'wallet_successfully_recharged',
                'transaction_date' => $dateTime->format('Y-m-d H:i:s'),
            ]);
            CommonHelper::addUserWalletBalance($amount, $user_id);

        } elseif ($explode[0] === 'subscription') {
            $plan_id = $explode[1];
            $user_id = $explode[2];

            $existingSub = UserSubscription::where('user_id', $user_id)
                ->where('plan_id', $plan_id)
                ->where('status', 'active')
                ->whereDate('created_at', now()->toDateString())
                ->first();
            if ($existingSub) return;

            $plan = SubscriptionPlan::find($plan_id);
            if ($plan) {
                $sub_amount = $plan->discounted_price ?: $plan->price;
                Transaction::create([
                    'user_id'          => $user_id,
                    'order_id'         => 0,
                    'type'             => Transaction::$typeDpo,
                    'txn_id'           => $txn_ref,
                    'payu_txn_id'      => $txn_token,
                    'amount'           => $sub_amount,
                    'status'           => Transaction::$statusSuccess,
                    'message'          => 'txn_subscription_payment',
                    'transaction_date' => now(),
                ]);

                UserSubscription::create([
                    'user_id'              => $user_id,
                    'plan_id'              => $plan->id,
                    'plan_name'            => $plan->name,
                    'price_paid'           => $sub_amount,
                    'discounted_price'     => $plan->discounted_price,
                    'free_delivery_above'  => $plan->free_delivery_above,
                    'start_date'           => now()->toDateString(),
                    'end_date'             => now()->addDays($plan->days - 1)->toDateString(),
                    'status'               => 'active',
                ]);
            }
        }
    }

    private function handleRedirect($company_ref, $status, $final_status = '')
    {
        $website_url = Setting::get_value('website_url') ?? "";
        $explode = explode('-', $company_ref);
        $type = $explode[0] ?? 'order';
        $id = $explode[1] ?? 0;

        if (!empty($website_url)) {
            $redirect_url = $website_url . '/web-payment-status?status=' . ($final_status ?: $status) . '&type=' . $type . '&payment_method=DPO&order_id=' . $id;
            return redirect($redirect_url);
        } else {
            return redirect()->route('dpo.redirect', ['order' => $company_ref]);
        }
    }

    public function dpoRedirect(Request $request)
    {
        Log::info("DPO Redirect received!", [
            'url' => $request->fullUrl(),
            'params' => $request->all()
        ]);

        $order_id = $request->order ?? $request->CompanyRef ?? '';
        $txn_token = $request->TransactionToken ?? $request->TransID ?? '';
        
        if (empty($order_id)) return redirect('/')->with('error', 'Invalid request');

        $explode = explode('-', $order_id);
        $status = Transaction::$statusFailed;

        // 1. Check DB first
        if ($explode[0] === 'order') {
            $status = Transaction::where('order_id', $explode[1])->where('user_id', $explode[2])->where('status', Transaction::$statusSuccess)->exists() ? Transaction::$statusSuccess : Transaction::$statusFailed;
        } elseif ($explode[0] === 'wallet') {
            $transactionDate = Carbon::createFromFormat('YmdHis', $explode[1])->format('Y-m-d H:i:s');
            $status = WalletTransaction::where('user_id', $explode[2])
                ->where('transaction_date', $transactionDate)
                ->where('status', Transaction::$statusSuccess)
                ->exists() ? Transaction::$statusSuccess : Transaction::$statusFailed;
        }

        // 2. Manual verification if not success in DB
        if ($status !== Transaction::$statusSuccess && !empty($txn_token)) {
            Log::info("DPO | Manual verification for token: " . $txn_token);
            $verification = $this->verifyDpoToken($txn_token);
            
            Log::info("DPO | Verification Response:", ['data' => $verification]);

            if ($verification && strtolower($verification['Result'] ?? '') === '000' && 
                (strtolower($verification['ResultExplanation'] ?? '') === 'approved' || 
                 strtolower($verification['ResultExplanation'] ?? '') === 'transaction paid' || 
                 strtolower($verification['ResultExplanation'] ?? '') === 'authorized' || 
                 strtolower($verification['TransactionFinalStatus'] ?? '') === 'approved')) {
                
                $status = Transaction::$statusSuccess;
                Log::info("DPO | Manual verification SUCCESS for token: " . $txn_token);

                // Process the payment immediately since callback hasn't arrived/finished
                $this->processDpoPayment(
                    $verification['CompanyRef'] ?? $order_id,
                    $txn_token,
                    $verification['TransactionRef'] ?? $txn_token,
                    $verification['TransactionAmount'] ?? 0
                );
            } else {
                Log::warning("DPO | Manual verification FAILED or PENDING for token: " . $txn_token);
            }
        }

        $website_url = Setting::get_value('website_url') ?? "";
        if (!empty($website_url)) {
            $redirect_url = $website_url . '/web-payment-status?status=' . $status . '&type=' . ($explode[0] ?? 'order') . '&payment_method=DPO&order_id=' . ($explode[1] ?? 0);
            return redirect($redirect_url);
        }
        return redirect('/')->with('status', $status);
    }

    private function verifyDpoToken($token)
    {
        $company_token = Setting::get_value('dpo_company_token');
        if (empty($company_token)) return null;

        $xml_request = '<?xml version="1.0" encoding="utf-8"?><API3G><CompanyToken>' . htmlspecialchars($company_token, ENT_XML1, 'UTF-8') . '</CompanyToken><Request>verifyToken</Request><TransactionToken>' . htmlspecialchars($token, ENT_XML1, 'UTF-8') . '</TransactionToken></API3G>';

        try {
            $ch = curl_init();
            curl_setopt_array($ch, [
                CURLOPT_URL => 'https://secure.3gdirectpay.com/API/v6/',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $xml_request,
                CURLOPT_HTTPHEADER => ['Content-Type: application/xml'],
                CURLOPT_TIMEOUT => 30,
            ]);
            $response = curl_exec($ch);
            curl_close($ch);
            if ($response) {
                $xml = simplexml_load_string($response);
                return json_decode(json_encode($xml), true);
            }
        } catch (\Exception $e) {
            Log::error("DPO | Verification failed: " . $e->getMessage());
        }
        return null;
    }
}
