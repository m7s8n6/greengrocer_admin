<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Services\LanguageService;
use App\Http\Controllers\Controller;
use App\Models\ApiCallTracking;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;

class StoreSettingsApiController extends Controller
{

    public function index()
    {
        $timezone_options = CommonHelper::getTimezoneOptions();
        $countries = json_decode(file_get_contents(base_path('config/countries_currency.json')), true);
        $store_settingsArray = array(
            "system_configurations" => 1,
            "system_timezone_gmt" => "+05:30",
            "system_configurations_id" => "13",
            "app_name" => "",
            "support_number" => "",
            "support_email" => "",

            "is_version_system_on" => 0,
            "required_force_update" => 0,
            "current_version" => "1.0.0",

            "ios_is_version_system_on" => 0,
            "ios_required_force_update" => 0,
            "ios_current_version" => "1.0.0",

            "logo" => "",
            "dark_logo" => "",
            "invoice_logo" => "",
            "copyright_details" => "",
            "store_address" => "",
            'map_latitude' => "",
            "map_longitude" => "",
            "currency" => "",
            "currency_code" => "",
            "decimal_point" => "",
            "system_timezone" => "",
            "default_city_id" => 0,

            "max_cart_items_count" => "",
            "min_order_amount" => "",
            "low_stock_limit" => "",
            "product_rating" => 0,
            "few_quantity_left_alert" => "",
            "date_format" => "d-m-Y",
            "time_format" => "h:i A",


            "delivery_boy_bonus_settings" => 0,
            "delivery_boy_bonus_type" => 0,
            "delivery_boy_bonus_percentage" => 0,
            "delivery_boy_bonus_min_amount" => 0,
            "delivery_boy_bonus_max_amount" => 0,

            "area_wise_delivery_charge" => 0,
            "min_amount" => "",
            "delivery_charge" => "",
            "is_refer_earn_on" => 0,
            "min_refer_earn_order_amount" => "",
            "refer_earn_bonus" => "",
            "refer_earn_method" => "",
            "max_refer_earn_amount" => "",
            "minimum_withdrawal_amount" => "",
            "max_product_return_days" => "",

            "user_wallet_refill_limit" => "",
            "tax_name" => "",
            "tax_number" => "",

            "from_mail" => "",
            "reply_to" => "",
            "generate_otp" => 0,

            "app_mode_customer" => 0,
            "app_mode_customer_remark" => "",

            "app_mode_seller" => 0,
            "app_mode_seller_remark" => "",

            "app_mode_delivery_boy" => 0,
            "app_mode_delivery_boy_remark" => "",

            "mailer" => "smtp",
            "smtp_from_mail" => "",
            "smtp_reply_to" => "",
            "smtp_email_password" => "",
            "smtp_host" => "",
            "smtp_port" => "",
            "smtp_content_type" => "",
            "smtp_encryption_type" => "",
            "google_place_api_key" => "",
            "google_map_api_key" => "",
            "apiKey" => "",
            "googleMapApiKey" => "",
            "map_provider" => "google",
            "text_gen_key" => "",
            "fssai_lic_img" => "",
            "allow_all_category_level" => 1,
            "is_category_section_in_homepage" => "",
            "is_brand_section_in_homepage" => "",
            "is_seller_section_in_homepage" => "",
            "is_country_section_in_homepage" => "",
            "count_category_section_in_homepage" => "",
            "count_brand_section_in_homepage" => "",
            "count_seller_section_in_homepage" => "",
            "count_country_section_in_homepage" => "",
            "one_seller_cart" => "",
            "self_pickup_mode" => "",
            "door_step_mode" => "",
            "playstore_url" => "",
            "appstore_url" => "",
            "phone_login" => "",
            "google_login" => "",
            "apple_login" => "",
            "email_login" => "",
            "panel_login_background_img",
            "notification_delay_after_cart_addition",
            "notification_interval",
            "notification_stop_time",
            "is_delivery_charge_refundable",
        );
        $variables = array_keys($store_settingsArray);
        $store_settings = Setting::whereIn('variable', $variables)->get();

        $login_settingsArray = array(
            "phone_login" => "",
            "google_login" => "",
            "apple_login" => "",
            "email_login" => "",
            "phone_auth_otp" => "",
            "phone_auth_password" => "",
            "firebase_authentication" => "",
            "custom_sms_gateway_otp_based" => ""
        );
        $login_variables = array_keys($login_settingsArray);
        $login_settings = Setting::whereIn('variable', $login_variables)->get();
        // Demo mode lives in .env (DEMO_MODE), not in the settings table.
        $login_settings->push((object) ['variable' => 'is_demo_mode_on', 'value' => (string) isDemoModeOn()]);

        $refer_earn_settingsArray = array(
            "referral_min_order_amount" => "",
            "referral_credit_first_order" => ""
        );
        $refer_earn_variables = array_keys($refer_earn_settingsArray);
        $refer_earn_settings = Setting::whereIn('variable', $refer_earn_variables)->get();

        $data = array(
            "store_settingsObject" => $store_settingsArray,
            "timezone_options" => $timezone_options,
            "currency_code" => $countries,
            "store_settings" => $store_settings,
            "login_settings" => $login_settings,
            "refer_earn_settings" => $refer_earn_settings
        );
        return CommonHelper::responseWithData($data);
    }

    public function save_login_setting(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'at_least_one' => 'At least one of phone login or google login must be enabled.',
        ]);

        $validator->after(function ($validator) use ($request) {
            // Validate that at least one of phone_login or google_login is enabled
            if (!$request->phone_login && !$request->google_login) {
                $validator->errors()->add('phone_login', 'At least one of phone login or google login must be enabled.');
                $validator->errors()->add('google_login', 'At least one of phone login or google login must be enabled.');
            }

            // Additional validation if phone_login is enabled
            if ($request->phone_login) {
                if (!$request->firebase_authentication && !$request->custom_sms_gateway_otp_based) {
                    $validator->errors()->add('firebase_authentication', 'When phone login is enabled, either Firebase Authentication or Custom SMS Gateway OTP Based must be enabled.');
                    $validator->errors()->add('custom_sms_gateway_otp_based', 'When phone login is enabled, either Firebase Authentication or Custom SMS Gateway OTP Based must be enabled.');
                }
            }
        });

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Only the primary admin (id 1) may switch Demo Mode on or off, whatever the current
        // state. Other admins can still save the rest of the login settings as long as they
        // leave the Demo Mode value unchanged.
        if ($request->has('is_demo_mode_on')
            && (int) (auth()->user()->id ?? 0) !== 1
            && ((int) $request->is_demo_mode_on === 1 ? 1 : 0) !== isDemoModeOn()) {
            return CommonHelper::responseError('Only the main admin can change Demo Mode.');
        }

        foreach ($request->all() as $key => $value) {
            // Demo mode is written to .env below, never stored in the settings table.
            if ($key === 'is_demo_mode_on') {
                continue;
            }
            $value = $value ?? " ";
            $setting = Setting::where('variable', $key)->first();
            if ($setting) {
                $setting->variable = $key;
                $setting->value = $value;

                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = $key;
                $setting->value = $value;

                $setting->save();
            }
        }

        if ($request->has('is_demo_mode_on') && !$this->saveDemoModeToEnv((int) $request->is_demo_mode_on === 1 ? 1 : 0)) {
            return CommonHelper::responseError('Login settings saved, but the .env file is not writable so Demo Mode could not be changed.');
        }
        return CommonHelper::responseSuccess(__('login_settings_saved_successfully'));
    }

    /**
     * Mirror the Demo Mode toggle into .env (DEMO_MODE) so the rest of the app, which reads
     * the env value, follows it. Returns false when .env cannot be written.
     */
    private function saveDemoModeToEnv(int $value): bool
    {
        try {
            $env = new \Brotzka\DotenvEditor\DotenvEditor();
            if ($env->keyExists('DEMO_MODE')) {
                $env->changeEnv(['DEMO_MODE' => $value]);
            } else {
                $env->addData(['DEMO_MODE' => $value]);
            }
            return true;
        } catch (\Throwable $e) {
            Log::error('Could not write DEMO_MODE to .env: ' . $e->getMessage());
            return false;
        }
    }

    public function save_refer_earn_setting(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            $value = $value ?? " ";
            $setting = Setting::where('variable', $key)->first();
            if ($setting) {
                $setting->variable = $key;
                $setting->value =  $value;

                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = $key;
                $setting->value = $value;

                $setting->save();
            }
        }
        return CommonHelper::responseSuccess(__('refer_earn_settings_saved_successfully'));
    }

    /**
     * Save store basic settings (logo, app name, support details, etc.)
     */
    public function save_store_basic_setting(Request $request)
    {
        $translatable = ['copyright_details'];


        // Validate only if default language fields are empty
        $validator = Validator::make($request->all(), [
            'logo' => $request->hasFile('logo') ? 'mimes:jpeg,jpg,png,gif,webp,svg' : '',
            'dark_logo' => $request->hasFile('dark_logo') ? 'mimes:jpeg,jpg,png,gif,webp,svg' : '',
            'invoice_logo' => $request->hasFile('invoice_logo') ? 'mimes:jpeg,jpg,png,gif,webp,svg' : '',
            'fssai_lic_img' => $request->hasFile('fssai_lic_img') ? 'mimes:jpeg,jpg,png,gif,webp' : '',
            'panel_login_background_img' => $request->hasFile('panel_login_background_img') ? 'mimes:jpeg,jpg,png,gif,webp' : '',
            // Default language required
            //'app_name' . config('app.default_language') => 'required|string',
            'copyright_details' . config('app.default_language') => 'required|string',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Handle files
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $logo = Storage::disk('public')->putFileAs('logo', $file, $fileName);
        }
        if ($request->hasFile('fssai_lic_img')) {
            $file = $request->file('fssai_lic_img');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $fssai_lic_img = Storage::disk('public')->putFileAs('fssai_lic_img', $file, $fileName);
        }
        if ($request->hasFile('panel_login_background_img')) {
            $file = $request->file('panel_login_background_img');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $panel_login_background_img = Storage::disk('public')->putFileAs('panel_login_background_img', $file, $fileName);
        }

        $store_basic_variables = [
            'system_configurations',
            'system_timezone_gmt',
            'system_configurations_id',
            'app_name',
            'support_number',
            'support_email',
            'logo',
            'dark_logo',
            'invoice_logo',
            'fssai_lic_img',
            'panel_login_background_img',
            'copyright_details'
        ];

        foreach ($store_basic_variables as $key) {

            $setting = Setting::firstOrNew(['variable' => $key]);

            // FILES
            if ($request->hasFile($key)) {
                $file = $request->file($key);
                $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
                $path = Storage::disk('public')->putFileAs($key, $file, $fileName);
                $setting->value = $path;
                $setting->save();
                continue;
            }

            // TRANSLATABLE
            if (in_array($key, $translatable) && $request->has($key)) {
                $setting->value = $this->cleanMultilangValue($request->$key, $setting->value);
                $setting->save();
                continue;
            }

            // NORMAL
            if ($request->has($key)) {
                $setting->value = trim($request->$key);
                $setting->save();
            }
        }

        return CommonHelper::responseSuccess('store_settings_saved_successfully');
    }


    private function cleanMultilangValue($value, $oldValue = null)
    {
        if (empty($value)) {
            return "";
        }

        $decoded = json_decode($value, true);
        $existing = json_decode($oldValue, true) ?? [];

        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            foreach ($decoded as $lang => $text) {
                if (!is_string($text) || $text === '') {
                    unset($existing[$lang]);
                    continue;
                }

                $text = preg_replace('/\r\n|\r|\n/', ' ', $text);
                $text = preg_replace('/\s+/', ' ', $text);
                $existing[$lang] = trim($text);
            }

            return json_encode(
                $existing,
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            );
        }

        return trim($value);
    }


    /**
     * Save address settings (store address, coordinates, currency, timezone, etc.)
     */
    public function save_address_setting(Request $request)
    {
        $translatable = ['store_address'];

        $address_variables = [
            'store_address',
            'map_latitude',
            'map_longitude',
            'currency',
            'currency_code',
            'decimal_point',
            'system_timezone',
            'default_city_id'
        ];

        foreach ($address_variables as $key) {

            if (!array_key_exists($key, $request->all())) {
                continue;
            }

            $setting = Setting::firstOrNew(['variable' => $key]);

            if (in_array($key, $translatable)) {
                $value = $this->cleanMultilangValue(
                    $request->$key,
                    $setting->value
                );
                $setting->value = $value !== '' ? $value : json_encode([]);
            } else {
                $setting->value = trim($request->$key ?? '');
            }

            $setting->save();
        }

        return CommonHelper::responseSuccess('address_settings_saved_successfully');
    }

    /**
     * Save other settings (cart limits, order amounts, stock limits, etc.)
     */
    public function save_other_setting(Request $request)
    {
        $other_variables = [
            'max_cart_items_count',
            'min_order_amount',
            'low_stock_limit',
            'product_rating',
            'few_quantity_left_alert',
            'date_format',
            'time_format',
            'country_code',
            'nation_code',
            'is_delivery_charge_refundable',
            'allow_all_category_level'
        ];

        foreach ($request->all() as $key => $value) {
            if (in_array($key, $other_variables)) {
                $value = $value ?? " ";
                $setting = Setting::where('variable', $key)->first();

                if ($setting) {
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                } else {
                    $setting = new Setting();
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                }
            }
        }

        return CommonHelper::responseSuccess('other_settings_saved_successfully');
    }

    /**
     * Save delivery boy settings (bonus settings, OTP system, etc.)
     */
    public function save_delivery_boy_setting(Request $request)
    {
        $delivery_boy_variables = [
            'delivery_boy_bonus_settings',
            'delivery_boy_bonus_type',
            'delivery_boy_bonus_percentage',
            'delivery_boy_bonus_min_amount',
            'delivery_boy_bonus_max_amount',
            'generate_otp'
        ];

        foreach ($request->all() as $key => $value) {
            if (in_array($key, $delivery_boy_variables)) {
                $value = $value ?? " ";
                $setting = Setting::where('variable', $key)->first();

                if ($setting) {
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                } else {
                    $setting = new Setting();
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                }
            }
        }

        return CommonHelper::responseSuccess('delivery_boy_settings_saved_successfully');
    }

    /**
     * Save app settings (app modes, version control, store URLs, etc.)
     */
    public function save_app_setting(Request $request)
    {
        $appVariables = [
            'app_mode_customer',
            'app_mode_customer_remark',
            'app_mode_seller',
            'app_mode_seller_remark',
            'app_mode_delivery_boy',
            'app_mode_delivery_boy_remark',
            'playstore_url',
            'appstore_url',
            'is_version_system_on',
            'required_force_update',
            'current_version',
            'ios_is_version_system_on',
            'ios_required_force_update',
            'ios_current_version'
        ];

        $translatable = [
            'app_mode_customer_remark',
            'app_mode_seller_remark',
            'app_mode_delivery_boy_remark',
        ];

        $validator = Validator::make($request->all(), [
            'playstore_url' => 'nullable|url',
            'appstore_url' => 'nullable|url',
            'current_version' => 'required_if:is_version_system_on,1|string',
            'ios_current_version' => 'required_if:ios_is_version_system_on,1|string',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $defaultLanguage = config('app.default_language');
        $remarkToggles = [
            'app_mode_customer_remark' => 'app_mode_customer',
            'app_mode_seller_remark' => 'app_mode_seller',
            'app_mode_delivery_boy_remark' => 'app_mode_delivery_boy',
        ];
        foreach ($remarkToggles as $remarkKey => $toggleKey) {
            if ((string) $request->input($toggleKey) !== '1') continue;
            $decoded = json_decode((string) $request->input($remarkKey), true);
            $defaultValue = is_array($decoded) ? trim((string) ($decoded[$defaultLanguage] ?? '')) : '';
            if ($defaultValue === '') {
                return CommonHelper::responseError(str_replace('_', ' ', $remarkKey) . ' (default language) is required.');
            }
        }

        foreach ($appVariables as $key) {
            if (!$request->has($key)) continue;

            $setting = Setting::where('variable', $key)->first() ?? new Setting();
            $setting->variable = $key;

            if (in_array($key, $translatable)) {

                $setting->value = $this->cleanMultilangValue(
                    $request->$key,
                    $setting->value
                );
            } else {
                $setting->value = $request->$key;
            }

            $setting->save();
        }

        return CommonHelper::responseSuccess('app_settings_saved_successfully');
    }

    private function processValue($value)
    {
        if (empty($value)) {
            return "";
        }

        $decoded = json_decode($value, true);

        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            $cleaned = [];

            foreach ($decoded as $langCode => $content) {
                $content = preg_replace('/\r\n|\r|\n/', ' ', $content);
                $content = preg_replace('/\s+/', ' ', $content);
                $cleaned[$langCode] = trim(
                    preg_replace('/\s+/', ' ', $content)
                );
            }

            return json_encode(
                $cleaned,
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            );
        }

        return trim(preg_replace('/\s+/', ' ', $value));
    }

    public function save_frontend_home_setting(Request $request)
    {
        $frontend_home_variables = [
            'is_category_section_in_homepage',
            'count_category_section_in_homepage',
            'is_brand_section_in_homepage',
            'count_brand_section_in_homepage',
            'is_seller_section_in_homepage',
            'count_seller_section_in_homepage',
            'is_country_section_in_homepage',
            'count_country_section_in_homepage'
        ];

        foreach ($request->all() as $key => $value) {
            if (in_array($key, $frontend_home_variables)) {
                $value = $value ?? " ";
                $setting = Setting::where('variable', $key)->first();

                if ($setting) {
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                } else {
                    $setting = new Setting();
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                }
            }
        }

        return CommonHelper::responseSuccess('frontend_home_settings_saved_successfully');
    }

    /**
     * Save SMTP mail settings
     */
    public function save_smtp_mail_setting(Request $request)
    {
        $smtp_variables = [
            'mailer',
            'smtp_from_mail',
            'smtp_reply_to',
            'smtp_email_password',
            'smtp_host',
            'smtp_port',
            'smtp_content_type',
            'smtp_encryption_type'
        ];

        foreach ($request->all() as $key => $value) {
            if (in_array($key, $smtp_variables)) {
                $value = $value ?? " ";
                $setting = Setting::where('variable', $key)->first();

                if ($setting) {
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                } else {
                    $setting = new Setting();
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                }
            }
        }

        return CommonHelper::responseSuccess('smtp_mail_settings_saved_successfully');
    }

    /**
     * Save third party API credentials
     */
    public function save_third_party_api_setting(Request $request)
    {
        $api_variables = ['google_place_api_key', 'google_map_api_key', 'apiKey', 'googleMapApiKey', 'text_gen_key', 'map_provider'];

        foreach ($request->all() as $key => $value) {
            if (in_array($key, $api_variables)) {
                $value = $value ?? " ";

                // Note: google_place_api_key and google_map_api_key are already encrypted on the frontend
                // apiKey, googleMapApiKey, android_map_key, and ios_map_key are stored as original unencrypted values

                $setting = Setting::where('variable', $key)->first();

                if ($setting) {
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                } else {
                    $setting = new Setting();
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                }
            }
        }

        return CommonHelper::responseSuccess('third_party_api_settings_saved_successfully');
    }

    /**
     * Save seller settings
     */
    public function save_seller_setting(Request $request)
    {
        $seller_variables = ['one_seller_cart', 'seller_commission', 'self_pickup_mode'];

        // Quick Delivery requires One Seller Cart - turning it off drops every module back to
        // Fixed Time Window so no module is left on a slot type it can no longer use.
        if ($request->has('one_seller_cart') && (int) trim((string) $request->one_seller_cart) !== 1) {
            Setting::where('variable', 'like', 'time_slot_type_%')->where('value', 'express')->update(['value' => 'fixed']);
        }

        foreach ($request->all() as $key => $value) {
            if (in_array($key, $seller_variables)) {
                $value = $value ?? " ";
                $setting = Setting::where('variable', $key)->first();

                if ($setting) {
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                } else {
                    $setting = new Setting();
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                }
            }
        }

        return CommonHelper::responseSuccess('seller_settings_saved_successfully');
    }

    /**
     * Save cart settings
     */
    public function save_cart_setting(Request $request)
    {
        $cart_variables = [
            'cart_notification',
            'notification_delay_after_cart_addition',
            'notification_interval',
            'notification_stop_time'
        ];

        foreach ($request->all() as $key => $value) {
            if (in_array($key, $cart_variables)) {
                $value = $value ?? " ";
                $setting = Setting::where('variable', $key)->first();

                if ($setting) {
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                } else {
                    $setting = new Setting();
                    $setting->variable = $key;
                    $setting->value = $value;
                    $setting->save();
                }
            }
        }

        return CommonHelper::responseSuccess('cart_settings_saved_successfully');
    }

    public function save_additional_charges(Request $request)
    {
        if (!$request->has('additional_charges')) {
            return response()->json([
                'status' => false,
                'message' => 'Additional charges data missing.'
            ]);
        }

        $setting = Setting::where('variable', 'additional_charges')->first();

        if (!$setting) {
            $setting = new Setting();
            $setting->variable = 'additional_charges';
        }

        $setting->value = $this->cleanAdditionalCharges(
            $request->additional_charges
        );

        $setting->save();

        return CommonHelper::responseSuccess('additional_charges_saved_successfully');
    }

    private function cleanAdditionalCharges($value)
    {
        if (empty($value)) {
            return "[]";
        }

        // If string → decode
        if (is_string($value)) {
            $value = json_decode($value, true);
        }

        if (!is_array($value)) {
            return "[]";
        }

        $cleaned = [];

        foreach ($value as $charge) {

            $titles = [];

            if (isset($charge['title']) && is_array($charge['title'])) {

                foreach ($charge['title'] as $lang => $text) {
                    $text = preg_replace('/\r\n|\r|\n/', ' ', $text);
                    $text = preg_replace('/\s+/', ' ', $text);
                    $titles[$lang] = trim($text);
                }
            }

            $chargeType = isset($charge['charge_type']) && in_array($charge['charge_type'], ['amount', 'percentage'])
                ? $charge['charge_type']
                : 'amount';

            $applicableOn = isset($charge['applicable_on']) && is_array($charge['applicable_on'])
                ? array_values(array_intersect($charge['applicable_on'], ['order', 'self_pickup', 'pos']))
                : ['order', 'self_pickup', 'pos'];

            $cleaned[] = [
                'title'         => $titles,
                'amount'        => isset($charge['amount']) ? (float)$charge['amount'] : 0,
                'charge_type'   => $chargeType,
                'is_refundable' => !empty($charge['is_refundable']),
                'is_active'     => !isset($charge['is_active']) || !empty($charge['is_active']),
                'applicable_on' => $applicableOn,
            ];
        }

        return json_encode(
            $cleaned,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
    }

    public function get_additional_charges()
    {
        $setting = Setting::where('variable', 'additional_charges')->first();

        if (!$setting || empty($setting->value)) {
            return response()->json([
                'status' => true,
                'data' => []
            ]);
        }

        $value = $setting->value;

        $decoded = json_decode($value, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {

            return response()->json([
                'status' => true,
                'type' => 'json',
                'data' => $decoded
            ]);
        }

        return response()->json([
            'status' => true,
            'type' => 'text',
            'data' => $value
        ]);
    }


    public function getPurchaseCode()
    {
        $code = Setting::get_value('purchase_code') ?? '';

        return CommonHelper::responseWithData($code);
    }

    public function purchaseCode($code, $type = 0)
    {

        $domain = env('APP_URL');
        $path = 'https://validator.wrteam.in/egrocer_validator?purchase_code=' . $code . '&domain_url=' . $domain;
        $response = file_get_contents($path);
        $data = json_decode($response, true);

        $valid = false;
        if (isset($data['error']) && $data['error'] == false) {
            $valid = true;
        }

        $setting = Setting::where('variable', 'purchase_code')->first() ?? new Setting();
        $setting->variable = 'purchase_code';
        $setting->value = $valid ? $code : '';
        $setting->save();

        if ($type) {
            return $valid;
        } else {
            return CommonHelper::responseWithData($response);
        }
    }
    public function getPurchaseCodeUpdater()
    {
        $code = Setting::get_value('purchase_code') ?? '';

        $domain = env('APP_URL');
        $path = 'https://validator.wrteam.in/egrocer_validator?purchase_code=' . $code . '&domain_url=' . $domain;
        $response = file_get_contents($path);
        $data = json_decode($response, true);

        $valid = false;
        if (isset($data['error']) && $data['error'] == false) {
            $valid = true;
        }
        if ($code == 'direct_sale_from_wrteam') {
            $valid = true;
        }

        $setting = Setting::where('variable', 'purchase_code')->first() ?? new Setting();
        $setting->variable = 'purchase_code';
        $setting->value = $valid ? $code : '';
        $setting->save();

        return $valid;
    }

    public function testMail(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'mailer' => 'required',
            'email' => 'required|email',
            'host' => 'required',
            'username' => 'required',
            'password' => 'required',
            'port' => 'required',
            'encryption' => 'required',
            'support_email' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $config = [
            'driver' => $request->mailer,
            'host' => $request->host,
            'username' => $request->username,
            'password' => $request->password,
            'port' => $request->filled('port') ? (int) $request->port : null,
            'encryption' => $request->encryption,
            'from'       => [
                'address' => $request->username,
                'name'    => $request->app_name,
            ]
        ];


        Config::set('mail', $config);

        Mail::purge($request->mailer);

        try {

            Mail::send([], [], function ($message) use ($request) {
                $message->to($request->email)
                    ->subject('Testing Mail')
                    ->html('Email Test Successfully!');
                $message->from($request->username, $request->app_name);
            });
            return CommonHelper::responseSuccess('test_mail_sent_successfully');
        } catch (\Exception $e) {
            return CommonHelper::responseError($e->getMessage());
        }
    }

    /*  *
     * Google Places Autocomplete API
     * Provides location suggestions based on user input
     */
    public function googlePlacesAutocomplete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'input' => 'required|string|min:2',
            'language' => 'nullable|string|size:2',
            'types' => 'nullable|string',
            'components' => 'nullable|string',
            'sessiontoken' => 'nullable|string',
            'source' => 'required|string|in:app,web',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Track API call
        ApiCallTracking::incrementCallCount('google_places_autocomplete', $request->source);

        try {
            // Get Google Places API key from settings
            $apiKey = Setting::get_value('apiKey');

            if (empty($apiKey)) {
                return CommonHelper::responseError('Google Places API key not configured');
            }

            $newSuggestions = $this->googlePlacesNewAutocomplete($request, $apiKey);
            if ($newSuggestions !== null) {
                return CommonHelper::responseWithData([
                    'suggestions' => $newSuggestions,
                    'status' => count($newSuggestions) ? 'OK' : 'ZERO_RESULTS',
                ]);
            }

            // Places API (New) is the only Places API used (the legacy one can't be enabled on new
            // Google projects; existing installs enable Places API (New) instead).
            return CommonHelper::responseError($this->googlePlacesError ?: 'Google Places API (New) is not available. Enable it for the Google key saved in settings.');
        } catch (\Exception $e) {
            Log::error('Google Places Autocomplete Error: ' . $e->getMessage());
            return CommonHelper::responseError('An error occurred while fetching location suggestions');
        }
    }

    /**
     * Google Places Details API
     * Get detailed information about a specific place
     */
    public function googlePlacesDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'place_id' => 'required|string',
            'fields' => 'nullable|string',
            'language' => 'nullable|string|size:2',
            'sessiontoken' => 'nullable|string',
            'source' => 'required|string|in:app,web',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Track API call
        ApiCallTracking::incrementCallCount('google_places_details', $request->source);

        try {
            // Get Google Places API key from settings
            $apiKey = Setting::get_value('apiKey');

            if (empty($apiKey)) {
                return CommonHelper::responseError('Google Places API key not configured');
            }

            $newDetails = $this->googlePlacesNewDetails($request, $apiKey);
            if ($newDetails !== null) {
                return CommonHelper::responseWithData($newDetails);
            }

            return CommonHelper::responseError($this->googlePlacesError ?: 'Google Places API (New) is not available. Enable it for the Google key saved in settings.');
        } catch (\Exception $e) {
            Log::error('Google Places Details Error: ' . $e->getMessage());
            return CommonHelper::responseError('An error occurred while fetching place details');
        }
    }

    /** Last error text from googlePlacesNewRequest(), so the reply can show the real reason. */
    protected $googlePlacesError = '';

    /**
     * Places API (New) call. Returns the decoded JSON, or null when Google refuses it (not enabled
     * for the key's project, key restrictions, any other error); the reason is kept in
     * $this->googlePlacesError.
     */
    protected function googlePlacesNewRequest(string $method, string $url, string $apiKey, string $fieldMask, ?array $body = null): ?array
    {
        $this->googlePlacesError = '';

        try {
            $headers = ['X-Goog-Api-Key: ' . $apiKey, 'X-Goog-FieldMask: ' . $fieldMask];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            if ($method === 'POST') {
                $headers[] = 'Content-Type: application/json';
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body ?? []));
            }
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            $response = curl_exec($ch);
            $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            $data = json_decode((string) $response, true);
            if ($httpCode !== 200 || !is_array($data)) {
                $this->googlePlacesError = $data['error']['message'] ?? 'Google Places API (New) request failed.';
                return null;
            }
            return $data;
        } catch (\Throwable $e) {
            $this->googlePlacesError = $e->getMessage();
            Log::error('Google Places (New) request failed: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Autocomplete (New) -> the `placePrediction` list the apps already read, or null on failure. The request keeps the legacy inputs: `components` ("country:in|country:us")
     * becomes includedRegionCodes, and the legacy "(cities)" / "(regions)" types become primary types;
     * other legacy type words (geocode, address, establishment) have no equivalent and are left out.
     */
    private function googlePlacesNewAutocomplete(Request $request, string $apiKey): ?array
    {
        $body = [
            'input' => $request->input,
            'languageCode' => $request->language ?? 'en',
        ];
        if ($request->sessiontoken) {
            $body['sessionToken'] = $request->sessiontoken;
        }
        if ($request->components) {
            $codes = [];
            foreach (explode('|', $request->components) as $component) {
                if (stripos($component, 'country:') === 0) {
                    $codes[] = strtolower(substr($component, 8));
                }
            }
            if ($codes) {
                $body['includedRegionCodes'] = array_slice(array_values(array_unique($codes)), 0, 15);
            }
        }
        if ($request->types === '(cities)') {
            $body['includedPrimaryTypes'] = ['locality', 'administrative_area_level_3'];
        } elseif ($request->types === '(regions)') {
            $body['includedPrimaryTypes'] = ['locality', 'sublocality', 'postal_code', 'country', 'administrative_area_level_1'];
        }

        $data = $this->googlePlacesNewRequest(
            'POST',
            'https://places.googleapis.com/v1/places:autocomplete',
            $apiKey,
            'suggestions.placePrediction.place,suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat,suggestions.placePrediction.types',
            $body
        );
        if ($data === null) {
            return null;
        }

        $suggestions = [];
        foreach ((array) ($data['suggestions'] ?? []) as $suggestion) {
            if (empty($suggestion['placePrediction'])) {
                continue; // query predictions have no place
            }
            $prediction = $suggestion['placePrediction'];
            $suggestions[] = ['placePrediction' => [
                'place' => $prediction['place'] ?? ('places/' . ($prediction['placeId'] ?? '')),
                'placeId' => $prediction['placeId'] ?? '',
                'text' => [
                    'text' => $prediction['text']['text'] ?? '',
                    'matches' => $prediction['text']['matches'] ?? [],
                ],
                'structuredFormat' => [
                    'mainText' => [
                        'text' => $prediction['structuredFormat']['mainText']['text'] ?? '',
                        'matches' => $prediction['structuredFormat']['mainText']['matches'] ?? [],
                    ],
                    'secondaryText' => [
                        'text' => $prediction['structuredFormat']['secondaryText']['text'] ?? '',
                    ],
                ],
                'types' => $prediction['types'] ?? [],
            ]];
        }

        return $suggestions;
    }

    /**
     * Place Details (New) -> the field set the apps already read, or null on failure. Fields that cost extra on Google's side and that the address pickers don't use (photos,
     * website) are not requested and keep their empty defaults.
     */
    private function googlePlacesNewDetails(Request $request, string $apiKey): ?array
    {
        $language = $request->language ?? 'en';
        $query = ['languageCode' => $language];
        if ($request->sessiontoken) {
            $query['sessionToken'] = $request->sessiontoken;
        }

        $data = $this->googlePlacesNewRequest(
            'GET',
            'https://places.googleapis.com/v1/places/' . rawurlencode($request->place_id) . '?' . http_build_query($query),
            $apiKey,
            'id,displayName,formattedAddress,addressComponents,location,viewport,types,googleMapsUri,utcOffsetMinutes,adrFormatAddress,shortFormattedAddress'
        );
        if ($data === null || empty($data['id'])) {
            return null;
        }

        $components = [];
        foreach ((array) ($data['addressComponents'] ?? []) as $component) {
            $components[] = [
                'longText' => $component['longText'] ?? '',
                'shortText' => $component['shortText'] ?? '',
                'types' => $component['types'] ?? [],
                'languageCode' => $component['languageCode'] ?? $language,
            ];
        }
        $uri = $data['googleMapsUri'] ?? '';

        return [
            'name' => $data['name'] ?? ('places/' . $data['id']),
            'id' => $data['id'],
            'types' => $data['types'] ?? [],
            'formattedAddress' => $data['formattedAddress'] ?? '',
            'addressComponents' => $components,
            'location' => [
                'latitude' => $data['location']['latitude'] ?? 0,
                'longitude' => $data['location']['longitude'] ?? 0,
            ],
            'viewport' => [
                'low' => [
                    'latitude' => $data['viewport']['low']['latitude'] ?? 0,
                    'longitude' => $data['viewport']['low']['longitude'] ?? 0,
                ],
                'high' => [
                    'latitude' => $data['viewport']['high']['latitude'] ?? 0,
                    'longitude' => $data['viewport']['high']['longitude'] ?? 0,
                ],
            ],
            'googleMapsUri' => $uri,
            'websiteUri' => '',
            'utcOffsetMinutes' => $data['utcOffsetMinutes'] ?? 0,
            'adrFormatAddress' => $data['adrFormatAddress'] ?? '',
            'iconMaskBaseUri' => '',
            'iconBackgroundColor' => '',
            'displayName' => [
                'text' => $data['displayName']['text'] ?? '',
                'languageCode' => $data['displayName']['languageCode'] ?? $language,
            ],
            'shortFormattedAddress' => $data['shortFormattedAddress'] ?? '',
            'photos' => [],
            'pureServiceAreaBusiness' => false,
            'googleMapsLinks' => [
                'directionsUri' => $uri,
                'placeUri' => $uri,
                'photosUri' => $uri,
            ],
        ];
    }

    /**
     * Generate ADR format address from address components
     */
    private function generateAdrFormatAddress($addressComponents)
    {
        $adrParts = [];

        foreach ($addressComponents as $component) {
            $types = $component['types'] ?? [];
            $longName = $component['long_name'] ?? '';

            if (in_array('locality', $types)) {
                $adrParts[] = '<span class="locality">' . $longName . '</span>';
            } elseif (in_array('administrative_area_level_1', $types)) {
                $adrParts[] = '<span class="region">' . $longName . '</span>';
            } elseif (in_array('country', $types)) {
                $adrParts[] = '<span class="country-name">' . $longName . '</span>';
            }
        }

        return implode(', ', $adrParts);
    }

    /**
     * Get short formatted address (usually just the locality)
     */
    private function getShortFormattedAddress($addressComponents)
    {
        foreach ($addressComponents as $component) {
            $types = $component['types'] ?? [];
            if (in_array('locality', $types)) {
                return $component['long_name'] ?? '';
            }
        }
        return '';
    }

    /**
     * Google Maps Geocoding API
     * Convert coordinates to address with fixed radius of 500
     */
    public function googleMapsGeocoding(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'source' => 'required|string|in:app,web',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Track API call
        ApiCallTracking::incrementCallCount('google_maps_geocoding', $request->source);

        try {
            // Get Google Places API key from settings
            $apiKey = Setting::get_value('apiKey');

            if (empty($apiKey)) {
                return CommonHelper::responseError('Google Maps API key not configured');
            }

            // Build the API URL with fixed radius of 500
            $baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
            $params = [
                'key' => $apiKey,
                'latlng' => $request->latitude . ',' . $request->longitude,
                'radius' => 500,
            ];

            // Make the request to Google Maps Geocoding API
            $url = $baseUrl . '?' . http_build_query($params);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; eGrocer/1.0)');

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = curl_error($ch);
            $curlInfo = curl_getinfo($ch);
            curl_close($ch);

            if ($curlError) {
                return CommonHelper::responseError('Network error: ' . $curlError);
            }

            if ($httpCode !== 200) {
                return CommonHelper::responseError('Failed to fetch geocoding data. HTTP Code: ' . $httpCode);
            }

            if (empty($response)) {
                return CommonHelper::responseError('Empty response from Google Maps API');
            }

            $data = json_decode($response, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return CommonHelper::responseError('Invalid response from Google Maps Geocoding API: ' . json_last_error_msg());
            }

            // Check if Google API returned an error
            if (isset($data['status']) && $data['status'] !== 'OK' && $data['status'] !== 'ZERO_RESULTS') {
                $errorMessage = $data['error_message'] ?? 'Google Maps Geocoding API error: ' . $data['status'];
                return CommonHelper::responseError($errorMessage);
            }

            // Format the response for better consumption
            $formattedResults = [];
            if (isset($data['results']) && is_array($data['results'])) {
                foreach ($data['results'] as $result) {
                    $formattedResults[] = [
                        'formatted_address' => $result['formatted_address'] ?? '',
                        'geometry' => $result['geometry'] ?? [],
                        'place_id' => $result['place_id'] ?? '',
                        'types' => $result['types'] ?? [],
                        'address_components' => $result['address_components'] ?? [],
                        'partial_match' => $result['partial_match'] ?? false,
                    ];
                }
            }

            return CommonHelper::responseWithData([
                'results' => $formattedResults,
                'status' => $data['status'] ?? 'OK',
                'radius' => 500
            ]);
        } catch (\Exception $e) {
            Log::error('Google Maps Geocoding Error: ' . $e->getMessage());
            return CommonHelper::responseError('An error occurred while processing geocoding request: ' . $e->getMessage());
        }
    }

    // ============================================================
    // Map provider dispatchers (Google paid vs OpenStreetMap free).
    // Callers (admin panel map pickers, customer app/web) hit these
    // instead of the google*/osm* methods directly — each one routes
    // to whichever provider is configured and returns a normalized
    // response shape so the frontend does not need to branch on it.
    // ============================================================

    protected function activeMapProvider(): string
    {
        $provider = Setting::get_value('map_provider');
        return $provider === 'osm' ? 'osm' : 'google';
    }

    public function placesAutocomplete(Request $request)
    {
        return $this->activeMapProvider() === 'osm'
            ? $this->osmPlacesAutocomplete($request)
            : $this->googlePlacesAutocomplete($request);
    }

    public function placesDetails(Request $request)
    {
        return $this->activeMapProvider() === 'osm'
            ? $this->osmPlacesDetails($request)
            : $this->googlePlacesDetails($request);
    }

    public function mapsGeocoding(Request $request)
    {
        return $this->activeMapProvider() === 'osm'
            ? $this->osmReverseGeocoding($request)
            : $this->googleMapsGeocoding($request);
    }

    /**
     * Nominatim search -> normalized to the Google-Places-Autocomplete shape so
     * frontend code (EditCity.vue, EditSeller.vue, SellerDetails.vue, the OsmMapPicker
     * component) can stay provider-agnostic. Nominatim's public server is free but
     * rate-limited - fine for admin-panel usage (a handful of lookups per day), not
     * meant for high-volume customer-facing traffic. Self-host Nominatim later if that
     * becomes a problem, swapping only the URL in nominatimRequest() below.
     */
    public function osmPlacesAutocomplete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'input' => 'required|string|min:2',
            'language' => 'nullable|string|size:2',
            'source' => 'required|string|in:app,web',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        ApiCallTracking::incrementCallCount('osm_places_autocomplete', $request->source);

        try {
            $params = [
                'q' => $request->input,
                'format' => 'json',
                'addressdetails' => 1,
                'limit' => 5,
                'accept-language' => $request->language ?? 'en',
            ];
            $data = $this->nominatimRequest('search', $params);
            if (isset($data['__error'])) {
                return CommonHelper::responseError($data['__error']);
            }

            $suggestions = [];
            foreach ((array) $data as $row) {
                $osmType = $row['osm_type'] ?? '';
                $osmId = $row['osm_id'] ?? '';
                // Encode a placeId callers can pass back to placesDetails.
                $placeId = $osmType && $osmId ? (strtoupper(substr($osmType, 0, 1)) . $osmId) : '';
                $display = $row['display_name'] ?? '';
                $address = $row['address'] ?? [];
                $mainText = $address['city'] ?? $address['town'] ?? $address['village']
                    ?? $address['suburb'] ?? $address['road'] ?? $display;
                $secondary = trim(str_replace($mainText, '', $display), " ,");

                $suggestions[] = [
                    'placePrediction' => [
                        'place' => 'osm/' . $placeId,
                        'placeId' => $placeId,
                        'text' => ['text' => $display, 'matches' => []],
                        'structuredFormat' => [
                            'mainText' => ['text' => $mainText, 'matches' => []],
                            'secondaryText' => ['text' => $secondary],
                        ],
                        'types' => [$row['type'] ?? $row['class'] ?? 'place'],
                        // Provider-specific extras - the OSM map picker can use these
                        // as a fast path and skip the details round-trip if it wants.
                        '_osm' => [
                            'lat' => isset($row['lat']) ? (float) $row['lat'] : null,
                            'lon' => isset($row['lon']) ? (float) $row['lon'] : null,
                            'address' => $address,
                        ],
                    ],
                ];
            }

            return CommonHelper::responseWithData([
                'suggestions' => $suggestions,
                'status' => 'OK',
                'provider' => 'osm',
            ]);
        } catch (\Exception $e) {
            Log::error('OSM Places Autocomplete Error: ' . $e->getMessage());
            return CommonHelper::responseError('An error occurred while fetching location suggestions');
        }
    }

    /**
     * Nominatim lookup by encoded place_id (e.g. "N12345", "W67890", "R11").
     * Normalized to the Google-Places-Details shape.
     */
    public function osmPlacesDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'place_id' => 'required|string',
            'language' => 'nullable|string|size:2',
            'source' => 'required|string|in:app,web',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        ApiCallTracking::incrementCallCount('osm_places_details', $request->source);

        try {
            $placeId = (string) $request->place_id;
            // Expected forms: "N123", "W123", "R123" (node/way/relation prefix).
            if (!preg_match('/^[NWR]\d+$/i', $placeId)) {
                return CommonHelper::responseError('Invalid OSM place id');
            }
            $params = [
                'osm_ids' => strtoupper($placeId),
                'format' => 'json',
                'addressdetails' => 1,
                'accept-language' => $request->language ?? 'en',
            ];
            $data = $this->nominatimRequest('lookup', $params);
            if (isset($data['__error'])) {
                return CommonHelper::responseError($data['__error']);
            }
            $row = is_array($data) && !empty($data) ? $data[0] : null;
            if (!$row) {
                return CommonHelper::responseError('Place not found');
            }
            return CommonHelper::responseWithData($this->normalizeOsmPlace($row, $request->language ?? 'en'));
        } catch (\Exception $e) {
            Log::error('OSM Places Details Error: ' . $e->getMessage());
            return CommonHelper::responseError('An error occurred while fetching place details');
        }
    }

    /**
     * Nominatim reverse geocoding -> shape matching googleMapsGeocoding().
     */
    public function osmReverseGeocoding(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'source' => 'required|string|in:app,web',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        ApiCallTracking::incrementCallCount('osm_maps_geocoding', $request->source);

        try {
            $params = [
                'lat' => $request->latitude,
                'lon' => $request->longitude,
                'format' => 'json',
                'addressdetails' => 1,
                'zoom' => 18,
            ];
            $data = $this->nominatimRequest('reverse', $params);
            if (isset($data['__error'])) {
                return CommonHelper::responseError($data['__error']);
            }
            if (!is_array($data) || empty($data)) {
                return CommonHelper::responseWithData(['results' => [], 'status' => 'ZERO_RESULTS']);
            }

            $components = $this->osmAddressToComponents($data['address'] ?? []);
            $result = [
                'formatted_address' => $data['display_name'] ?? '',
                'geometry' => [
                    'location' => [
                        'lat' => isset($data['lat']) ? (float) $data['lat'] : 0,
                        'lng' => isset($data['lon']) ? (float) $data['lon'] : 0,
                    ],
                ],
                'place_id' => ($data['osm_type'] ?? '') && ($data['osm_id'] ?? '')
                    ? strtoupper(substr($data['osm_type'], 0, 1)) . $data['osm_id']
                    : '',
                'types' => [$data['type'] ?? 'place'],
                'address_components' => array_map(function ($c) {
                    return [
                        'long_name' => $c['longText'],
                        'short_name' => $c['shortText'],
                        'types' => $c['types'],
                    ];
                }, $components),
                'partial_match' => false,
            ];

            return CommonHelper::responseWithData([
                'results' => [$result],
                'status' => 'OK',
                'provider' => 'osm',
            ]);
        } catch (\Exception $e) {
            Log::error('OSM Reverse Geocoding Error: ' . $e->getMessage());
            return CommonHelper::responseError('An error occurred while processing geocoding request');
        }
    }

    protected function nominatimRequest(string $endpoint, array $params): array
    {
        $url = 'https://nominatim.openstreetmap.org/' . $endpoint . '?' . http_build_query($params);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        // Nominatim ToS requires a real User-Agent identifying the app.
        curl_setopt($ch, CURLOPT_USERAGENT, 'eGrocer/1.0 (' . parse_url(env('APP_URL', 'localhost'), PHP_URL_HOST) . ')');
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) {
            return ['__error' => 'Network error: ' . $err];
        }
        if ($httpCode !== 200) {
            return ['__error' => 'OSM request failed. HTTP ' . $httpCode];
        }
        $data = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return ['__error' => 'Invalid response from OSM Nominatim'];
        }
        return $data;
    }

    protected function normalizeOsmPlace(array $row, string $language = 'en'): array
    {
        $addr = $row['address'] ?? [];
        $components = $this->osmAddressToComponents($addr);
        $lat = isset($row['lat']) ? (float) $row['lat'] : 0;
        $lon = isset($row['lon']) ? (float) $row['lon'] : 0;
        $placeId = ($row['osm_type'] ?? '') && ($row['osm_id'] ?? '')
            ? strtoupper(substr($row['osm_type'], 0, 1)) . $row['osm_id']
            : '';

        return [
            'name' => 'osm/' . $placeId,
            'id' => $placeId,
            'types' => [$row['type'] ?? $row['class'] ?? 'place'],
            'formattedAddress' => $row['display_name'] ?? '',
            'addressComponents' => array_map(function ($c) use ($language) {
                return $c + ['languageCode' => $language];
            }, $components),
            'location' => ['latitude' => $lat, 'longitude' => $lon],
            'viewport' => [
                'low' => ['latitude' => $lat, 'longitude' => $lon],
                'high' => ['latitude' => $lat, 'longitude' => $lon],
            ],
            'displayName' => [
                'text' => $addr['city'] ?? $addr['town'] ?? $addr['village'] ?? ($row['name'] ?? $row['display_name'] ?? ''),
                'languageCode' => $language,
            ],
            'shortFormattedAddress' => $addr['city'] ?? $addr['town'] ?? $addr['village'] ?? '',
            'provider' => 'osm',
        ];
    }

    /**
     * Map Nominatim address keys -> Google address_components-style rows.
     */
    protected function osmAddressToComponents(array $addr): array
    {
        $map = [
            'house_number' => ['street_number'],
            'road' => ['route'],
            'suburb' => ['sublocality', 'sublocality_level_1'],
            'neighbourhood' => ['neighborhood'],
            'village' => ['locality'],
            'town' => ['locality'],
            'city' => ['locality'],
            'county' => ['administrative_area_level_2'],
            'state' => ['administrative_area_level_1'],
            'state_district' => ['administrative_area_level_2'],
            'postcode' => ['postal_code'],
            'country' => ['country'],
            'country_code' => ['country'],
        ];
        $out = [];
        foreach ($map as $key => $types) {
            if (!empty($addr[$key])) {
                $val = $addr[$key];
                $shortVal = ($key === 'country_code') ? strtoupper((string) $val) : (string) $val;
                $longVal = ($key === 'country_code') ? ($addr['country'] ?? strtoupper((string) $val)) : (string) $val;
                $out[] = ['longText' => $longVal, 'shortText' => $shortVal, 'types' => $types];
            }
        }
        return $out;
    }

    /**
     * Google Gemini AI API
     * Generate content using Google's Gemini AI model
     */
    public function googleGeminiAI(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prompt' => 'required|string|min:1|max:10000',
            'source' => 'required|string|in:app,web',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Track API call
        ApiCallTracking::incrementCallCount('google_gemini', $request->source);

        try {
            // Get Google Gemini API key from settings
            $apiKey = Setting::get_value('text_gen_key');

            if (empty($apiKey)) {
                return CommonHelper::responseError('Google Gemini API key not configured');
            }

            // Build the API URL
            $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
            $url = $baseUrl . '?key=' . $apiKey;

            // Prepare the request payload - simplified format
            $payload = [
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' => $request->prompt
                            ]
                        ]
                    ]
                ]
            ];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 60);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                'Accept: application/json'
            ]);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = curl_error($ch);
            curl_close($ch);
            // Log::info($response);
            if ($curlError) {
                return CommonHelper::responseError('Network error: ' . $curlError);
            }

            if ($httpCode !== 200) {
                return CommonHelper::responseError('Failed to generate content. HTTP Code: ' . $httpCode);
            }

            if (empty($response)) {
                return CommonHelper::responseError('Empty response from Google Gemini API');
            }

            $data = json_decode($response, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return CommonHelper::responseError('Invalid response from Google Gemini API: ' . json_last_error_msg());
            }

            // Check if Gemini API returned an error
            if (isset($data['error'])) {
                $errorMessage = $data['error']['message'] ?? 'Google Gemini API error';
                return CommonHelper::responseError('Gemini API Error: ' . $errorMessage);
            }

            // Extract only the generated content - simplified response
            $generatedContent = '';
            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                $generatedContent = $data['candidates'][0]['content']['parts'][0]['text'];
            } else {
                return CommonHelper::responseError('No content generated by Gemini AI');
            }

            // Return only the essential data
            return CommonHelper::responseWithData($generatedContent);
        } catch (\Exception $e) {
            Log::error('Google Gemini AI Error: ' . $e->getMessage());
            return CommonHelper::responseError('An error occurred while generating content: ' . $e->getMessage());
        }
    }
}
