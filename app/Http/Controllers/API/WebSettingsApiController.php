<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class WebSettingsApiController extends Controller
{
    public function index()
    {
        $settingsArray = array(
            "site_title" => "",
            "website_url" => "",

            "category_background_color_light_theme" => "",
            "category_background_color_dark_theme" => "",
            "brand_background_color_light_theme" => "",
            "brand_background_color_dark_theme" => "",
            "country_background_color_light_theme" => "",
            "country_background_color_dark_theme" => "",
            "category_background_color_mode" => "global",
            "brand_background_color_mode" => "global",
            "country_background_color_mode" => "global",

            "app_title" => "",
            "app_tagline" => "",
            "app_short_description" => "",

            "is_android_app" => 0,
            "android_app_url" => "",
            "play_store_logo" => "",

            "is_ios_app" => 0,
            "ios_app_url" => "",
            "ios_store_logo" => "",

            "copyright_details" => "",

            "common_meta_title" => "",
            "common_meta_description" => "",

            "show_color_picker_in_website" => false,
            "favicon" => "",
            "web_logo" => "",
            "dark_web_logo" => "",
            "placeholder_image" => "",
            "loading" => "",

            "website_mode" => "",
            "website_mode_remark" => ""

        );
        $variables = array_keys($settingsArray);

        $settings = Setting::whereIn('variable', $variables)->get();

        foreach ($settings as $setting) {
            if (array_key_exists($setting->variable, $settingsArray)) {
                $settingsArray[$setting->variable] = $setting->value;
            }
        }

        $data = array(
            "settingsObject" => $settingsArray,
            "settings" => $settings
        );
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request)
    {
        $translatable = [
            'site_title',
            'common_meta_title',
            'common_meta_description',
            'website_mode_remark',
            'app_title',
            'app_short_description',
        ];

        $validator = Validator::make($request->all(), [
            'site_title' . config('app.default_language') => 'sometimes|required|string',
            'common_meta_title' . config('app.default_language') => 'sometimes|required|string',
            'common_meta_description' . config('app.default_language') => 'sometimes|required|string',
            'website_url' => 'sometimes|required|url',
            'android_app_url' => ['required_if:is_android_app,1'],
            'play_store_logo' => $request->hasFile('play_store_logo') ? 'mimes:jpeg,jpg,png,gif,webp' : '',
            'ios_app_url' => ['required_if:is_ios_app,1'],
            'ios_store_logo' => $request->hasFile('ios_store_logo') ? 'mimes:jpeg,jpg,png,gif,webp' : '',

            'favicon' => $request->hasFile('favicon') ? 'mimes:jpeg,jpg,png,gif,webp' : '',
            'web_logo' => $request->hasFile('web_logo') ? 'mimes:jpeg,jpg,png,gif,webp,svg' : '',
            'dark_web_logo' => $request->hasFile('dark_web_logo') ? 'mimes:jpeg,jpg,png,gif,webp,svg' : '',
            'placeholder_image' => $request->hasFile('placeholder_image') ? 'mimes:jpeg,jpg,png,gif,webp' : '',
            'loading' => $request->hasFile('loading') ? 'mimes:jpeg,jpg,png,gif,webp' : '',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $filePaths = array();

        if ($request->hasFile('play_store_logo')) {
            $file = $request->file('play_store_logo');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $play_store_logo = Storage::disk('public')->putFileAs('front_end/play_store_logo', $file, $fileName);
            $filePaths['play_store_logo'] = $play_store_logo;
        }

        if ($request->hasFile('ios_store_logo')) {
            $file = $request->file('ios_store_logo');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $favicon = Storage::disk('public')->putFileAs('front_end/ios_store_logo', $file, $fileName);
            $filePaths['ios_store_logo'] = $favicon;
        }
        if ($request->hasFile('favicon')) {
            $file = $request->file('favicon');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $favicon = Storage::disk('public')->putFileAs('front_end/favicon', $file, $fileName);
            $filePaths['favicon'] = $favicon;
        }
        if ($request->hasFile('web_logo')) {
            $file = $request->file('web_logo');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $web_logo = Storage::disk('public')->putFileAs('front_end/web_logo', $file, $fileName);
            $filePaths['web_logo'] = $web_logo;
        }
        if ($request->hasFile('dark_web_logo')) {
            $file = $request->file('dark_web_logo');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $dark_web_logo = Storage::disk('public')->putFileAs('front_end/web_logo', $file, $fileName);
            $filePaths['dark_web_logo'] = $dark_web_logo;
        }
        if ($request->hasFile('placeholder_image')) {
            $file = $request->file('placeholder_image');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $placeholder_image = Storage::disk('public')->putFileAs('front_end/placeholder_image', $file, $fileName);
            $filePaths['placeholder_image'] = $placeholder_image;
        }
        foreach ($request->all() as $key => $value) {

            $is_file_selected = false;

            if (
                in_array($key, ['play_store_logo', 'ios_store_logo', 'favicon', 'web_logo', 'dark_web_logo', 'placeholder_image'])
                && isset($filePaths[$key])
            ) {
                $is_file_selected = true;
                $value = $filePaths[$key];
            }

            $setting = Setting::firstOrNew(['variable' => $key]);

            if (in_array($key, $translatable)) {

                $value = $this->cleanMultilangValue(
                    $request->$key,
                    $setting->value
                );

                // Literal '{}', not json_encode([]) - PHP can't tell an empty associative array
                // from an empty indexed array, so json_encode([]) would produce "[]" here, which
                // is exactly the corruption this field type must never end up storing.
                $setting->value = $value !== '' ? $value : '{}';
            } else {

                $setting->value = $value ?? "";
            }

            $setting->save();
        }

        // Flowchart Sync: When saving global colors, update existing items in the database
        $categoryMode = Setting::get_value('category_background_color_mode') ?: 'global';
        if ($categoryMode === 'global') {
            $catLight = Setting::get_value('category_background_color_light_theme') ?: '';
            $catDark = Setting::get_value('category_background_color_dark_theme') ?: '';
            \App\Models\Category::query()->update([
                'background_color_for_light_theme' => $catLight,
                'background_color_for_dark_theme' => $catDark
            ]);
        }

        $brandMode = Setting::get_value('brand_background_color_mode') ?: 'global';
        if ($brandMode === 'global') {
            $brandLight = Setting::get_value('brand_background_color_light_theme') ?: '';
            $brandDark = Setting::get_value('brand_background_color_dark_theme') ?: '';
            \App\Models\Brand::query()->update([
                'background_color_for_light_theme' => $brandLight,
                'background_color_for_dark_theme' => $brandDark
            ]);
        }

        $countryMode = Setting::get_value('country_background_color_mode') ?: 'global';
        if ($countryMode === 'global') {
            $countryLight = Setting::get_value('country_background_color_light_theme') ?: '';
            $countryDark = Setting::get_value('country_background_color_dark_theme') ?: '';
            \App\Models\Country::query()->update([
                'background_color_for_light_theme' => $countryLight,
                'background_color_for_dark_theme' => $countryDark
            ]);
        }

        return CommonHelper::responseSuccess('web_settings_saved_successfully');
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

                if ($text === null || $text === '') {
                    unset($existing[$lang]);
                    continue;
                }

                $text = preg_replace('/\r\n|\r|\n/', ' ', $text);
                $text = preg_replace('/\s+/', ' ', $text);

                $existing[$lang] = trim($text);
            }

            // JSON_FORCE_OBJECT: when the last remaining language's text gets cleared above,
            // $existing becomes an empty PHP array - json_encode() alone can't distinguish that
            // from an empty *indexed* array and outputs "[]" instead of "{}", corrupting this
            // lang-code-keyed field into a value every other read site can't parse as expected.
            return json_encode(
                $existing,
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_FORCE_OBJECT
            );
        }

        return trim($value);
    }
}
