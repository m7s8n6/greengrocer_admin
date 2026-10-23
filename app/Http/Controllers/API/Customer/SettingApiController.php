<?php

namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Favorite;
use App\Models\Setting;
use App\Models\SeoSetting;
use App\Models\SocialMedia;
use App\Models\TimeSlot;
use Illuminate\Http\Request;

class SettingApiController extends Controller
{
    public function getSettings(Request $request)
    {
        $variables = array(
            "app_name",
            "support_number",
            "support_email",
            "is_version_system_on",
            "required_force_update",
            "current_version",
            "ios_is_version_system_on",
            "ios_required_force_update",
            "ios_current_version",
            "store_address",
            "map_latitude",
            "map_longitude",
            "currency",
            "currency_code",
            "decimal_point",
            "system_timezone",
            "default_city_id",
            "max_cart_items_count",
            "min_order_amount",
            "area_wise_delivery_charge",
            "min_amount",
            "delivery_charge",
            "is_refer_earn_on",
            "min_refer_earn_order_amount",
            "refer_earn_bonus",
            "refer_earn_method",
            "max_refer_earn_amount",
            "minimum_withdrawal_amount",
            "max_product_return_days",
            "delivery_boy_bonus_percentage",
            "user_wallet_refill_limit",
            "tax_name",
            "tax_number",
            "low_stock_limit",
            "generate_otp",
            "app_mode_customer",
            "app_mode_customer_remark",
            "app_mode_seller",
            "app_mode_seller_remark",
            "app_mode_delivery_boy",
            "app_mode_delivery_boy_remark",
            "contact_us",
            "about_us",
            "privacy_policy",
            "returns_and_exchanges_policy",
            "shipping_policy",
            "cancellation_policy",
            "terms_conditions",
            "privacy_policy_delivery_boy",
            "terms_conditions_delivery_boy",
            "privacy_policy_manager_app",
            "terms_conditions_manager_app",
            "privacy_policy_seller",
            "terms_conditions_seller",
            "common_meta_keywords",
            "common_meta_title",
            "common_meta_description",
            "show_color_picker_in_website",
            "screenshots",
            "google_play",
            "favicon",
            "web_logo",
            "dark_web_logo",
            "placeholder_image",
            "loading",
            "time_slots_is_enabled",
            "time_slots_delivery_starts_from",
            "time_slots_allowed_days",
            "google_place_api_key",
            "apiKey ",
            "popup_enabled",
            "popup_always_show_home",
            "popup_type",
            "popup_type_id",
            "popup_slug",
            "popup_url",
            "popup_image",
            "popup_start_date",
            "popup_end_date",
            "playstore_url",
            "appstore_url",
            "one_seller_cart",
            "website_mode",
            "website_mode_remark",
            "delivery_estimate_days",
            "phone_login",
            "google_login",
            "apple_login",
            "email_login",
            "phone_auth_otp",
            "phone_auth_password",
            "firebase_authentication",
            "custom_sms_gateway_otp_based",
            "enable_road_path_tracking",
            "broadcast_driver",
            "pusher_app_key",
            "pusher_app_cluster",
            "reverb_app_key",
            "reverb_host",
            "reverb_port",
            "reverb_scheme",
            "text_gen_key",
            "date_format",
            "time_format",
            "country_code",
            "nation_code",
            "is_delivery_charge_refundable",
            "category_background_color_light_theme",
            "category_background_color_dark_theme",
            "brand_background_color_light_theme",
            "brand_background_color_dark_theme",
            "country_background_color_light_theme",
            "country_background_color_dark_theme"
        );
        $data = CommonHelper::getSettings($variables);

        // Time Slots settings are saved per-module (suffixed variable_{module_id}) - the generic
        // getSettings() call above only reads the unsuffixed variable name, so override these
        // three with the module-scoped value for the requesting module.
        $moduleId = $request->header('X-Module-Id') ?: 1;
        $data['time_slots_is_enabled'] = Setting::get_value('time_slots_is_enabled_' . $moduleId) ?? '';
        $data['time_slots_allowed_days'] = Setting::get_value('time_slots_allowed_days_' . $moduleId) ?? '';
        $data['delivery_estimate_days'] = Setting::get_value('delivery_estimate_days_' . $moduleId) ?? '';

        // Schedule Popup Offer
        if (isset($data['popup_enabled']) && $data['popup_enabled'] == 1) {
            $currentDate = date('Y-m-d');
            $startDate = $data['popup_start_date'] ?? '';
            $endDate = $data['popup_end_date'] ?? '';

            if ($startDate != '' && $currentDate < $startDate) {
                $data['popup_enabled'] = "0";
            }
            if ($endDate != '' && $currentDate > $endDate) {
                $data['popup_enabled'] = "0";
            }
        }

        $data = CommonHelper::resolveTranslatedSettings($data);

        if (isset($data['default_city_id']) && $data['default_city_id']) {
            $data["default_city"] = CommonHelper::getDefaultCity();
        }

        $user_id = $request->user('api-customers') ? $request->user('api-customers')->id : '';
        $favorite = Favorite::select('favorites.product_id')->from('favorites')->join("products", "favorites.product_id", "=", "products.id")->where('favorites.user_id', $user_id)->get()->toArray();
        if (!empty($favorite)) {
            $favorite_product_ids = array_column($favorite, 'product_id');
            $data["favorite_product_ids"] = $favorite_product_ids;
        } else {
            $data["favorite_product_ids"] = [];
        }
        $cart = Cart::where('user_id', $user_id);
        if ($cart) {
            $data['cart_count'] = $cart->count();
        } else {
            $data['cart_count'] = 0;
        }

        $data['is_demo_mode_on'] = isDemoModeOn();

        // Which map the apps should draw and which services the server uses: 'google' or 'osm'.
        $data['map_provider'] = CommonHelper::activeMapProvider();

        $data['deeplink_settings'] = \App\Http\Controllers\API\DeeplinkSettingsApiController::getDeeplinkSettings();

        if (isset($request->is_web_setting) && $request->is_web_setting == 1) {
            $webVariables = array(
                "site_title",
                "website_url",
                "apiKey",
                "app_title",
                "app_tagline",
                "app_short_description",
                "is_android_app",
                "android_app_url",
                "play_store_logo",
                "is_ios_app",
                "ios_app_url",
                "ios_store_logo",
                "copyright_details",
                "common_meta_title",
                "common_meta_description",
                "show_color_picker_in_website",
                "favicon",
                "web_logo",
                "dark_web_logo",
                "placeholder_image",
                "loading",
                "one_seller_cart",
                "website_mode",
                "website_mode_remark",
                "delivery_estimate_days",
                "phone_login",
                "google_login",
                "apple_login",
                "email_login",
                "phone_auth_otp",
                "phone_auth_password",
                "firebase_authentication",
                "custom_sms_gateway_otp_based",
                "enable_road_path_tracking",
                "broadcast_driver",
                "pusher_app_key",
                "pusher_app_cluster",
                "reverb_app_key",
                "reverb_host",
                "reverb_port",
                "reverb_scheme",
                "text_gen_key"
            );
            $web_settings = CommonHelper::getSettings($webVariables);
            $data["web_settings"] = CommonHelper::resolveTranslatedSettings($web_settings);
            $firebase = CommonHelper::getFirebaseKeys();
            $data["firebase"] = CommonHelper::convertSettingsInArray($firebase);
            $data["social_media"] = SocialMedia::orderBy('id', 'ASC')->get()->makeHidden('image');
            $data["demo_mode"] = env('DEMO_MODE', 0);
        }

        if (!empty($data)) {
            $data = json_encode($data);
            $data = base64_encode($data);
            // `data` stays the base64 blob apps already decode; `realtime` is the same Pusher /
            // Reverb connection info as plain JSON so it can be read without decoding.
            $payload = CommonHelper::responseWithData($data)->getData(true);
            $payload['realtime'] = $this->realtimePayload();
            return response()->json($payload);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    /**
     * Realtime (Pusher / Reverb) connection details as plain JSON - no base64 and none of the
     * long policy texts that /settings returns - so app developers can read and test it easily.
     * Only public values: the app key and connection endpoint, never the app secret.
     */
    /**
     * Public realtime connection details (never the app secret), returned as the plain
     * `realtime` object on /settings.
     */
    private function realtimePayload(): array
    {
        $driver = Setting::get_value('broadcast_driver');
        $driver = in_array($driver, ['pusher', 'reverb'], true) ? $driver : '';

        $data = [
            'broadcast_driver' => $driver,
            'enabled' => 0,
            'key' => '',
            'cluster' => '',
            'host' => '',
            'port' => '',
            'scheme' => '',
            // Private-channel auth endpoints (send the Bearer token with the request).
            'customer_auth_endpoint' => url('customer/broadcasting/auth'),
            'delivery_boy_auth_endpoint' => url('broadcasting/auth'),
        ];

        if ($driver === 'pusher') {
            $data['key'] = trim((string) Setting::get_value('pusher_app_key'));
            $data['cluster'] = trim((string) Setting::get_value('pusher_app_cluster'));
            $data['enabled'] = ($data['key'] !== '' && $data['cluster'] !== '') ? 1 : 0;
        } elseif ($driver === 'reverb') {
            $data['key'] = trim((string) Setting::get_value('reverb_app_key'));
            $data['host'] = trim((string) Setting::get_value('reverb_host'));
            $data['port'] = trim((string) Setting::get_value('reverb_port'));
            $data['scheme'] = trim((string) Setting::get_value('reverb_scheme'));
            $data['enabled'] = ($data['key'] !== '' && $data['host'] !== '') ? 1 : 0;
        }

        return $data;
    }

    public function getPaymentMethods(Request $request)
    {
        $variables = array(
            "payment_method_settings",
            "cod_payment_method",
            "cod_mode",

            "paypal_payment_method",

            "razorpay_payment_method",
            "razorpay_key",
            "razorpay_secret_key",

            "paystack_payment_method",
            "paystack_public_key",
            "paystack_secret_key",
            "paystack_currency_code",

            "stripe_payment_method",
            "stripe_publishable_key",
            "stripe_secret_key",
            "stripe_currency_code",
            "stripe_mode",

            "paytm_payment_method",
            "paytm_mode",
            "paytm_merchant_key",
            "paytm_merchant_id",

            "midtrans_payment_method",

            "phonepay_payment_method",
            "phonepay_mode",
            //"phonepay_api_key", 
            //"phonepay_merchant_id", 
            //"phonepay_salt_index", 
            //"phonepay_app_id", 
            "phonepay_client_id",
            "phonepay_client_version",
            "phonepay_client_secret",
            "phonepay_payment_endpoint_url",

            "cashfree_payment_method",
            "cashfree_mode",

            "paytabs_payment_method",
            "paytabs_mode",

            "dpo_payment_method",
            "dpo_mode",
            "dpo_currency_code",

        );
        $settings = Setting::whereIn('variable', $variables)->get();
        $data = array();
        foreach ($variables as $variable) {
            $data[$variable] = "";
        }
        foreach ($settings as $setting) {
            $data[$setting->variable] = $setting->value ?? "";
        }

        if (!empty($data)) {
            $data = json_encode($data);
            $data = base64_encode($data);
            return CommonHelper::responseWithData($data);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getPrivacy()
    {

        $privacy_policy = Setting::get_value('privacy_policy');
        if (!empty($privacy_policy)) {
            return CommonHelper::responseWithData($privacy_policy);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getTerms()
    {

        $terms_conditions = Setting::get_value('terms_conditions');
        if (!empty($terms_conditions)) {
            return CommonHelper::responseWithData($terms_conditions);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getLogo()
    {

        $logo = Setting::get_value('logo');
        if (!empty($logo)) {
            $logo = asset('storage/' . $logo);
            return CommonHelper::responseWithData($logo);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getContact()
    {

        $contact_us = Setting::get_value('contact_us');
        if (!empty($contact_us)) {
            return CommonHelper::responseWithData($contact_us);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getAboutUs()
    {

        $about_us = Setting::get_value('about_us');
        if (!empty($about_us)) {
            return CommonHelper::responseWithData($about_us);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getTimezone()
    {

        $system_timezone = Setting::get_value('system_timezone');
        if (!empty($system_timezone)) {

            $system_timezone = json_decode($system_timezone, true);
            $system_timezone['tax_name'] = isset($system_timezone['tax_name']) && !empty($system_timezone['tax_name']) ? $system_timezone['tax_name'] : "";
            $system_timezone['tax_number'] = isset($system_timezone['tax_number']) && !empty($system_timezone['tax_number']) ? $system_timezone['tax_number'] : "0";
            $system_timezone['currency'] = Setting::get_value('currency');

            return CommonHelper::responseWithData($system_timezone);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getFcmKey()
    {

        $fcm_server_key = Setting::get_value('fcm_server_key');
        if (!empty($fcm_server_key)) {

            return CommonHelper::responseWithData($fcm_server_key);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getFrontEndSettings()
    {

        $front_end_settings = Setting::get_value('front_end_settings');

        if ($front_end_settings) {

            $data = array();
            $data['favicon'] = Setting::get_value('favicon') ? asset('storage/' . Setting::get_value('favicon')) : '';
            $data['screenshots'] = Setting::get_value('screenshots') ? Setting::get_value('screenshots') : '';
            $data['google_play'] = Setting::get_value('google_play') ? Setting::get_value('google_play') : '';
            $data['show_color_picker_in_website'] = Setting::get_value('show_color_picker_in_website') ? Setting::get_value('show_color_picker_in_website') : '';

            return CommonHelper::responseWithData($data);
        } else {
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getTimeSlots()
    {
        $data = $this->buildTimeSlotsData();
        if ($data === null) {
            return  CommonHelper::responseError('No settings found!');
        }
        return CommonHelper::responseWithData($data);
    }

    /**
     * Time slot payload for the current module, or null when slots are enabled but none are configured.
     * Shared by the time_slots endpoint and the cart (checkout) response.
     */
    public function buildTimeSlotsData()
    {
        // Time Slots are module-wise (module_id column + variable_{module_id} settings) -
        // without this filter every module's slots and settings would bleed into each other.
        $moduleId = request()->header('X-Module-Id');

        $timeSlotsIsEnabled = Setting::get_value('time_slots_is_enabled_' . $moduleId) ?? '';

        // Feature off for this module: nothing else below is meaningful, so don't leak slots or
        // day-config that the admin form itself hides once Enable/Disable Time Slots is off.
        if (!in_array($timeSlotsIsEnabled, [1, '1', true, 'true'], true)) {
            return [
                'time_slots_is_enabled' => 0,
            ];
        }

        // A module is configured as either Fixed or Quick Delivery at a time (the admin's Slot
        // Type radio) - only slots matching that active type should ever reach the customer,
        // even if old rows of the other type are still sitting in the table from before a switch.
        $activeSlotType = Setting::effectiveTimeSlotType($moduleId);

        $timeSlots = TimeSlot::where('status', 1)
            ->where('module_id', $moduleId)
            ->where('slot_type', $activeSlotType)
            ->orderBy('last_order_time')
            ->get();
        if (count($timeSlots)) {
            // Add default_title for each slot: base-table title (default language only).
            foreach ($timeSlots as $slot) {
                $slot->default_title = $slot->getRawOriginal('title') ?? '';
                // duration_minutes is express-only (fixed slots use from_time/to_time instead) -
                // every slot has the column, but only one side is ever meaningful for its type.
                if ($slot->slot_type === 'express') {
                    $slot->makeHidden(['from_time', 'to_time']);
                } else {
                    $slot->makeHidden(['duration_minutes']);
                }
            }
            $responce["time_slots_is_enabled"] = $timeSlotsIsEnabled;
            // Day-ahead picker + delivery estimate are Fixed-only concepts (the admin form itself
            // hides both when Slot Type is Quick Delivery) - omit rather than echo a stale/blank
            // Fixed-mode value that means nothing for express.
            if ($activeSlotType !== 'express') {
                $responce["time_slots_allowed_days"] = Setting::get_value('time_slots_allowed_days_' . $moduleId) ?? '';
                $responce["delivery_estimate_days"] = Setting::get_value('delivery_estimate_days_' . $moduleId) ?? '';
            }
            $responce["time_slots"] = $timeSlots;
            return $responce;
        }
        return null;
    }

    public function getSeoSettings(Request $request)
    {
        $query = SeoSetting::query();

        // Filter by search term if provided
        if ($request->has('search')) {
            $query->where('page_type', 'like', '%' . $request->search . '%');
        }

        // Filter by specific page_type if provided
        if ($request->has('page_type')) {
            $query->where('page_type', $request->input('page_type'));
        }

        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);

        $total = $query->count();

        $data = $query->offset($offset)
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                $item->favicon = Setting::get_value('favicon')
                    ? asset('storage/' . Setting::get_value('favicon'))
                    : '';
                return $item;
            });

        return response()->json([
            'error' => false,
            'message' => 'SEO pages fetched successfully',
            'total' => $total,
            'data' => $data
        ]);
    }
}
