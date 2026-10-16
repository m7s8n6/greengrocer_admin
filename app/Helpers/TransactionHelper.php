<?php

namespace App\Helpers;

use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Razorpay\Api\Api;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;

class TransactionHelper
{
    public static function createOrderonRazorpay($type, $order_id, $wallet_amount, $subscription_amount = 0)
    {
        $transaction_id = "";

        try {
            if ($type == 'order') {
                $order = Order::with('items')->findOrFail($order_id);
                $order_amount = $order->final_total;
                $order_details['receipt'] = strval($order->id);
            } elseif ($type == 'subscription') {
                $order_amount = $subscription_amount;
                $order_details['receipt'] = 'subscription_' . $order_id;
            } else {
                $order_amount = $wallet_amount;
                $order_details['receipt'] = 'wallet_recharge';
            }

            $api = new Api(Setting::get_value("razorpay_key"), Setting::get_value("razorpay_secret_key"));

            $currency_code = Setting::get_value('currency_code') ?? 'INR';
            $order_details = [
                'amount' => $order_amount * 100,
                'currency' => $currency_code,
                'payment_capture' => 1,
                'receipt' => $order_details['receipt'],
            ];

            $rpay_order = $api->order->create($order_details);

            $transaction_id = $rpay_order->id;
        } catch (\Exception $e) {
            Log::error("Exception: " . $e->getMessage());
            Log::error($e->getTraceAsString());
        }

        return $transaction_id;
    }

    public static function createOrderOnStripe($amount, $type = 'order', $order_id = 0, $subscription_plan_id = 0)
    {
        $response = "";
        try {
            $user = auth()->user();

            $stripe_secret_key = Setting::get_value('stripe_secret_key');
            $stripe_currency_code = Setting::get_value('stripe_currency_code');
            $app_name = Setting::get_value('app_name');

            $stripe = new \Stripe\StripeClient($stripe_secret_key);
            Log::info("Stripe Initialized", [$stripe]);

            $stripeAmount = (float)$amount * 100;

            $metadata = [
                'type' => $type,
                'user_id' => $user->id,
            ];

            if ($type == 'order' && $order_id > 0) {
                $metadata['order_id'] = $order_id;
            } elseif ($type == 'wallet') {
                $metadata['order_id'] = 'wallet-refill-user-' . $user->id . '-' . time() . '-' . rand(100, 999);
            } elseif ($type == 'subscription' && $subscription_plan_id > 0) {
                $metadata['subscription_plan_id'] = $subscription_plan_id;
                $metadata['order_id'] = 'subscription-' . $subscription_plan_id . '-' . $user->id;
            }

            $paymentIntentData = [
                'description' => $app_name,
                'amount' => $stripeAmount,
                'currency' => $stripe_currency_code,
                'automatic_payment_methods' => ['enabled' => true],
                'metadata' => $metadata,
            ];

            $stripeData = $stripe->paymentIntents->create($paymentIntentData);
            $response = $stripeData;
        } catch (\Exception $e) {
            Log::error("Stripe Payment Error: " . $e->getMessage());
            Log::error($e->getTraceAsString());
        } finally {
            return $response;
        }
    }

    public static function verifyRazorpaySignature($razorpay_order_id, $razorpay_payment_id, $razorpay_signature)
    {
        $generated_signature = hash_hmac('sha256', $razorpay_order_id . "|" . $razorpay_payment_id, Setting::get_value("razorpay_secret_key"));
        if ($generated_signature == $razorpay_signature) {
            return true;
        }
        return false;
    }

    public static function createOrderonMidtrans($type, $order_id, $wallet_amount, $subscription_amount = 0, $subscription_plan_id = 0)
    {
        $snapUrl = "";
        $snapToken = "";
        $currentDateTime = Carbon::now()->format('YmdHis');
        try {
            if ($type == 'order') {
                $order = Order::with('items')->findOrFail($order_id);

                $order_amount = $order->final_total;
                $order_details['receipt'] = 'order-' . $order_id . '-' . auth()->user()->id;
            } elseif ($type == 'subscription') {
                $order_amount = $subscription_amount;
                // Use subscription_plan_id with timestamp to ensure unique order_id for each payment attempt
                $order_details['receipt'] = 'subscription-' . $subscription_plan_id . '-' . auth()->user()->id . '-' . $currentDateTime;
            } else {
                $order_amount = $wallet_amount;
                $order_details['receipt'] = 'wallet-' . $currentDateTime . '-' . auth()->user()->id;
            }

            // Set Midtrans configuration
            Config::$serverKey = Setting::get_value('midtrans_server_key');
            Config::$isProduction = (Setting::get_value('midtrans_mode') == 'sandbox') ? false : true;
            // Prepare payment parameters
            $params = [
                'transaction_details' => [
                    'order_id' => $order_details['receipt'],
                    'gross_amount' => $order_amount * 1000, // amount in Rupiah
                ],
            ];

            // Get Snap payment page URL
            $snapResponse = Snap::createTransaction($params);

            // Extract Snap URL and token
            $snapUrl = $snapResponse->redirect_url;
            $snapToken = $snapResponse->token;
        } catch (\Exception $e) {
            Log::error("Exception: " . $e->getMessage());
            Log::error($e->getTraceAsString());
        }

        return [
            'snapUrl' => $snapUrl,
            'snapToken' => $snapToken,
        ];
    }
    public static function createOrderonPhonepe($type, $order_id, $wallet_amount, $subscription_amount = 0, $subscription_plan_id = 0)
    {
        try {
            $currentDateTime = Carbon::now()->format('YmdHis');
            $userId = auth()->id();

            if ($type === 'order') {
                $order = Order::with('items')->findOrFail($order_id);
                $order_amount = $order->final_total;
                $receipt = 'order-' . $order_id . '-' . $userId;
            } elseif ($type === 'subscription') {
                $order_amount = $subscription_amount;
                $receipt = 'subscription-' . $subscription_plan_id . '-' . $userId;
            } else {
                $order_amount = $wallet_amount;
                $receipt = 'wallet-' . $currentDateTime . '-' . $userId;
            }

            // === Configuration ===
            $apiKey        = Setting::get_value('phonepay_api_key');
            $merchantId    = Setting::get_value('phonepay_merchant_id');
            $mode          = Setting::get_value('phonepay_mode'); // 'uat' or 'production'
            $clientId      = Setting::get_value('phonepay_client_id');
            $clientVersion = Setting::get_value('phonepay_client_version');
            $clientSecret  = Setting::get_value('phonepay_client_secret');
            $websiteUrl  = Setting::get_value('website_url');

            // === Dynamic URLs ===
            if ($mode === 'production') {
                $tokenUrl = 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token';
                $orderUrl = 'https://api.phonepe.com/apis/pg/checkout/v2/sdk/order';
                $payUrl = 'https://api.phonepe.com/apis/pg/checkout/v2/pay';
            } else {
                $tokenUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';
                $orderUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/sdk/order';
                $payUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';
            }

            $merchantTransactionId = substr('TXN' . time() . '-' . $receipt, 0, 40);
            $tokenCurl = curl_init();

            curl_setopt_array($tokenCurl, array(
                CURLOPT_URL => $tokenUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => http_build_query([
                    'client_id' => $clientId,
                    'client_version' => $clientVersion,
                    'client_secret' => $clientSecret,
                    'grant_type' => 'client_credentials',
                ]),
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/x-www-form-urlencoded'
                ),
            ));

            $response = curl_exec($tokenCurl);
            curl_close($tokenCurl);

            // Decode token response
            $tokenResponse = json_decode($response, true);
            $accessToken = $tokenResponse['access_token'] ?? null;

            if (!$accessToken) {
                dd("Failed to retrieve token", $response);
            }

            // Build JSON payload properly
            $paymentData = [
                'merchantOrderId' => $merchantTransactionId,
                'amount' => (int) round($order_amount * 100),
                "metaInfo" => [
                    "type" => $type,
                    "order_id" => $order_id,
                    "user_id" => $userId,
                    "subscription_plan_id" => $subscription_plan_id,
                ],
                'paymentFlow' => [
                    'type' => 'PG_CHECKOUT',
                    'message' => 'Payment message used for collect requests',
                    'merchantUrls' => [
                        'redirectUrl' => $websiteUrl . '/web-payment-status?payment_method=phonepe',
                    ],
                ],
            ];

            $payCUrl = curl_init();

            curl_setopt_array($payCUrl, array(
                CURLOPT_URL => $payUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => json_encode($paymentData),
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/json',
                    'Authorization: O-Bearer ' . $accessToken,
                ),
            ));
            $response = curl_exec($payCUrl);
            curl_close($payCUrl);
            $final_response = json_decode($response, true);
            $final_response['merchantOrderId'] = $merchantTransactionId;
            $final_response['token'] = $accessToken;
            return CommonHelper::responseWithData($final_response);
        } catch (\Exception $e) {
            Log::error('PhonePe Order Error: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => $e->getMessage(),
            ];
        }
    }

    public static function createOrderonCashfree($type, $order_id, $wallet_amount, $subscription_amount = 0, $subscription_plan_id = 0)
    {
        try {
            $currentDateTime = Carbon::now()->format('YmdHis');
            $uniqueString = uniqid(); // Generate a unique identifier

            if ($type == 'order') {
                $order = Order::with('items')->findOrFail($order_id);
                $order_amount = $order->final_total;
                $order_details['receipt'] = 'order-' . $order_id . '-' . auth()->user()->id . '-' . $uniqueString;
            } elseif ($type == 'subscription') {
                $order_amount = $subscription_amount;
                $plan_id = $subscription_plan_id > 0 ? $subscription_plan_id : $order_id;
                $order_details['receipt'] = 'subscription-' . $plan_id . '-' . auth()->user()->id . '-' . $uniqueString;
            } else {
                $order_amount = $wallet_amount;
                $order_details['receipt'] = 'wallet-' . $currentDateTime . '-' . auth()->user()->id . '-' . $uniqueString;
            }
            $user = User::where('id', auth()->user()->id)->first();

            $cashfree_app_id = Setting::get_value('cashfree_app_id');
            $cashfree_secret_key = Setting::get_value('cashfree_secret_key');
            $cashfree_mode = Setting::get_value('cashfree_mode');

            // Ensure credentials are not empty
            if (empty($cashfree_app_id) || empty($cashfree_secret_key)) {
                throw new \Exception('Cashfree credentials are not properly configured');
            }

            $url = $cashfree_mode === 'production' ? 'https://api.cashfree.com/pg/links' : 'https://sandbox.cashfree.com/pg/links';

            $client = new Client();

            // Prepare link_purpose - ensure it's between 1-100 characters
            $linkPurpose = $type === 'order' ? 'Order Payment' : ($type === 'subscription' ? 'Subscription Payment' : 'Wallet Recharge');
            if (strlen($linkPurpose) > 100) {
                $linkPurpose = substr($linkPurpose, 0, 100);
            }

            // Prepare link_notes as map[string]string (Cashfree requirement)
            // Cashfree doesn't allow {, }, <, >, or " in note values, so we sanitize them
            $linkNotes = [];

            // Helper function to sanitize string values (remove forbidden characters)
            $sanitizeValue = function ($value) {
                if (empty($value)) {
                    return '';
                }
                // Remove forbidden characters: <, >, {, }, "
                $sanitized = str_replace(['<', '>', '{', '}', '"'], '', (string)$value);
                // Ensure value is between 1-100 characters
                if (strlen($sanitized) > 100) {
                    $sanitized = substr($sanitized, 0, 100);
                }
                return $sanitized;
            };

            // Build link_notes map with sanitized values
            $linkNotes['type'] = $sanitizeValue($type);

            if (!empty($order_id)) {
                $linkNotes['order_id'] = $sanitizeValue($order_id);
            }

            if ($type === 'subscription' && $subscription_plan_id > 0) {
                $linkNotes['plan_id'] = $sanitizeValue($subscription_plan_id);
            } elseif ($type === 'subscription' && !empty($order_id)) {
                $linkNotes['plan_id'] = $sanitizeValue($order_id);
            }

            if (!empty($currentDateTime)) {
                $linkNotes['time'] = $sanitizeValue($currentDateTime);
            }

            // Ensure link_notes is not empty (Cashfree requires at least one entry)
            if (empty($linkNotes)) {
                $linkNotes['type'] = $sanitizeValue($type);
            }

            $body = [
                'customer_details' => [
                    'customer_email' => $user->email ?? '',
                    'customer_name' => $user->name ?? '',
                    'customer_phone' => $user->mobile ? $user->mobile : '1234567890',
                ],
                'link_amount' => floatval($order_amount), // Ensure amount is float
                'link_currency' => Setting::get_value('currency_code') ?? 'INR',
                'link_id' => $order_details['receipt'], // Now using unique link_id
                'link_purpose' => $linkPurpose,
                'link_auto_reminders' => true,
                'link_notify' => [
                    'send_email' => true,
                    'send_sms' => false
                ],
                'link_meta' => [
                    'return_url' => route('cashfree.redirect', ['order' => $order_details['receipt']]),
                    'upi_intent' => false
                ],
                'link_notes' => $linkNotes, // Send as string, not array
                'link_expiry_time' => date('c', strtotime('+1 day'))
            ];

            $response = $client->post($url, [
                'headers' => [
                    'accept' => 'application/json',
                    'content-type' => 'application/json',
                    'x-api-version' => '2023-08-01',
                    'x-client-id' => trim($cashfree_app_id),
                    'x-client-secret' => trim($cashfree_secret_key),
                ],
                'json' => $body,
            ]);

            $responseBody = json_decode($response->getBody(), true);

            if (isset($responseBody['link_status']) && $responseBody['link_status'] === 'ACTIVE') {
                return [
                    'redirectUrl' => $responseBody['link_url'],
                ];
            } else {
                throw new \Exception('Cashfree API error: ' . json_encode($responseBody));
            }
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            Log::error('Cashfree ClientException:', [
                'message' => $e->getMessage(),
                'response' => $e->getResponse() ? json_decode($e->getResponse()->getBody(), true) : null
            ]);
            return [
                'error' => true,
                'message' => 'Payment gateway error: ' . $e->getMessage()
            ];
        } catch (\Exception $e) {
            Log::error('Error in createOrderonCashfree:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return [
                'error' => true,
                'message' => $e->getMessage()
            ];
        }
    }
    public static function createOrderonPayTabs($type, $order_id, $wallet_amount, $subscription_amount = 0, $subscription_plan_id = 0)
    {
        try {
            $currentDateTime = Carbon::now()->format('YmdHis');

            if ($type == 'order') {
                $order = Order::with('items')->findOrFail($order_id);
                $order_amount = $order->final_total;
                $order_details['receipt'] = 'order-' . $order_id . '-' . auth()->user()->id;
            } elseif ($type == 'subscription') {
                $order_amount = $subscription_amount;
                // Use subscription_plan_id instead of order_id for subscriptions
                $plan_id = $subscription_plan_id > 0 ? $subscription_plan_id : $order_id;
                $order_details['receipt'] = 'subscription-' . $plan_id . '-' . auth()->user()->id;
            } else {
                $order_amount = $wallet_amount;
                $order_details['receipt'] = 'wallet-' . $currentDateTime . '-' . auth()->user()->id;
            }

            $user = User::where('id', auth()->user()->id)->first();

            $paytabs_profile_id = Setting::get_value('paytabs_profile_id');
            $paytabs_secret_key = Setting::get_value('paytabs_secret_key');
            $paytabs_mode = Setting::get_value('paytabs_mode');
            $url = $paytabs_mode === 'production' ? 'https://www.paytabs.com/apiv2/create_pay_page' : 'https://secure-global.paytabs.com/payment/request';

            $response = Http::withHeaders([
                'authorization' => $paytabs_secret_key,
                'content-type' => 'application/json'
            ])->post($url, [
                'profile_id' => $paytabs_profile_id,
                'tran_type' => 'sale',
                'tran_class' => 'ecom',
                'cart_id' => $order_details['receipt'],
                'cart_description' => 'Paytabs',
                'cart_currency' => 'INR',
                'cart_amount' => $order_amount,
                'callback' => route('paytabs.callback'),
                'return' =>  route('paytabs.redirect', ['order' => $order_details['receipt']]),
                'hide_shipping' => true,
                'hide_billing' => true
            ]);

            if ($response->successful()) {
                // dd( $response->json() );
                $data = $response->json();
                return [
                    'redirectUrl' => $data['redirect_url'],
                ];
                // Handle successful response
            } else {

                $error = $response->json();  // To see error details returned by PayTabs
            }
        } catch (\Exception $e) {
            // Log the error or handle it as needed
            Log::error('Error in createOrderonPayTabs: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Create a DPO (Direct Pay Online) payment token and return the hosted payment page URL.
     *
     * DPO API endpoint (sandbox & live use the same URL; the CompanyToken determines environment):
     *   https://secure.3gdirectpay.com/API/v6/
     *
     * CompanyRef format (must match DpoController webhook parser):
     *   order        → "order-{order_id}-{user_id}"
     *   wallet       → "wallet-{YmdHis}-{user_id}"
     *   subscription → "subscription-{plan_id}-{user_id}"
     */
    public static function createOrderonDpo($type, $order_id, $wallet_amount, $subscription_amount = 0, $subscription_plan_id = 0)
    {
        try {
            $currentDateTime = Carbon::now()->format('YmdHis');
            $userId          = auth()->id();

            // Resolve amount and CompanyRef based on payment type
            if ($type === 'order') {
                $order        = Order::with('items')->findOrFail($order_id);
                $order_amount = $order->final_total;
                $company_ref  = 'order-' . $order_id . '-' . $userId;
                $description  = 'Order Payment';
            } elseif ($type === 'subscription') {
                $order_amount = $subscription_amount;
                $plan_id      = $subscription_plan_id > 0 ? $subscription_plan_id : $order_id;
                $company_ref  = 'subscription-' . $plan_id . '-' . $userId;
                $description  = 'Subscription Payment';
            } else {
                // wallet
                $order_amount = $wallet_amount;
                $company_ref  = 'wallet-' . $currentDateTime . '-' . $userId;
                $description  = 'Wallet Recharge';
            }

            // Fetch DPO settings
            $company_token = Setting::get_value('dpo_company_token');
            $service_type  = Setting::get_value('dpo_service_type');
            
            // Extract only the numeric part of the service type (e.g., "3854-Ecommerce" -> "3854")
            $service_type = preg_replace('/[^0-9]/', '', $service_type);

            $currency_code = Setting::get_value('dpo_currency_code') ?: 'ZAR';
            $base_url      = url('/');

            if (empty($company_token) || empty($service_type)) {
                throw new \Exception('DPO credentials (Company Token / Service Type) are not configured.');
            }

            // Redirect URL after customer completes / cancels payment on DPO hosted page
            $redirect_url = route('dpo.redirect', ['order' => $company_ref]);
            $service_date = Carbon::now()->format('Y/m/d H:i');

            // Build createToken XML request
            $xml_request = '<?xml version="1.0" encoding="utf-8"?>
<API3G>
  <CompanyToken>' . htmlspecialchars($company_token, ENT_XML1, 'UTF-8') . '</CompanyToken>
  <Request>createToken</Request>
  <Transaction>
    <PaymentAmount>' . number_format((float)$order_amount, 2, '.', '') . '</PaymentAmount>
    <PaymentCurrency>' . htmlspecialchars($currency_code, ENT_XML1, 'UTF-8') . '</PaymentCurrency>
    <CompanyRef>' . htmlspecialchars($company_ref, ENT_XML1, 'UTF-8') . '</CompanyRef>
    <RedirectURL>' . htmlspecialchars($redirect_url, ENT_XML1, 'UTF-8') . '</RedirectURL>
    <BackURL>' . htmlspecialchars($redirect_url, ENT_XML1, 'UTF-8') . '</BackURL>
    <ServiceURL>' . htmlspecialchars(route('dpo.callback'), ENT_XML1, 'UTF-8') . '</ServiceURL>
    <CompanyRefUnique>0</CompanyRefUnique>
    <PTL>5</PTL>
  </Transaction>
  <Services>
    <Service>
      <ServiceType>' . htmlspecialchars($service_type, ENT_XML1, 'UTF-8') . '</ServiceType>
      <ServiceDescription>' . htmlspecialchars($description, ENT_XML1, 'UTF-8') . '</ServiceDescription>
      <ServiceDate>' . htmlspecialchars($service_date, ENT_XML1, 'UTF-8') . '</ServiceDate>
    </Service>
  </Services>
</API3G>';

            Log::info('DPO createToken XML Request:', ['xml' => $xml_request]);

            // POST to DPO API
            $ch = curl_init();
            curl_setopt_array($ch, [
                CURLOPT_URL            => 'https://secure.3gdirectpay.com/API/v6/',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST           => true,
                CURLOPT_POSTFIELDS     => $xml_request,
                CURLOPT_HTTPHEADER     => ['Content-Type: application/xml'],
                CURLOPT_TIMEOUT        => 30,
                CURLOPT_SSL_VERIFYPEER => true,
            ]);

            $response = curl_exec($ch);
            $curl_error = curl_error($ch);
            curl_close($ch);

            if ($curl_error) {
                throw new \Exception('DPO cURL error: ' . $curl_error);
            }

            // Parse XML response
            $xml = simplexml_load_string($response);
            if (!$xml) {
                throw new \Exception('DPO returned invalid XML response.');
            }

            $result      = (string)($xml->Result ?? '');
            $trans_token = (string)($xml->TransToken ?? '');

            Log::info('DPO createToken response', [
                'result'      => $result,
                'trans_token' => $trans_token,
                'company_ref' => $company_ref,
            ]);

            // Result "000" = Token created successfully
            if ($result !== '000' || empty($trans_token)) {
                $explanation = (string)($xml->ResultExplanation ?? 'Unknown error');
                throw new \Exception('DPO token creation failed: ' . $explanation . ' (Result: ' . $result . ')');
            }

            // Return the hosted payment page URL
            return [
                'redirectUrl' => 'https://secure.3gdirectpay.com/payv3.php?ID=' . $trans_token,
            ];
        } catch (\Exception $e) {
            Log::error('DPO createOrderonDpo error: ' . $e->getMessage());
            return [
                'error'   => true,
                'message' => $e->getMessage(),
            ];
        }
    }
}
