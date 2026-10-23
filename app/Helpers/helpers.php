<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

function validateLogin()
{

    $code = Setting::get_value('purchase_code') ?? '';
    $is_login = false;
    $url = '';
    if ($code == '') {
        $is_login = true;
    }
    $data = array();
    $data['is_login'] = $is_login;
    $data['url'] = $url;

    return $data;
}
function validateAdmin()
{
    $todayDate = Carbon::now();
    $today = $todayDate->format('d-m-Y');
    $last_date = Cache::get('validate_admin');
  //  $interval = $todayDate->diffInDays($last_date);
    $interval = abs((int) $todayDate->diffInDays($last_date));
    if (is_null(Cache::get('validate_admin'))) {
        Cache::forever('validate_admin', $today);
    }
    if ($interval > 15) {
        Cache::forever('validate_admin', $today);
        $code = Setting::get_value('purchase_code') ?? '';
        $domain = env('APP_URL');
        $path = 'https://validator.wrteam.in/egrocer_validator?purchase_code=' . $code . '&domain_url=' . $domain;
        $response = file_get_contents($path);
        $data = json_decode($response, true);

        if (isset($data['error']) && $data['error'] == true) {
            $setting = Setting::where('variable', 'purchase_code')->first() ?? new Setting();
            $setting->value = '';
            $setting->save();
        }
    }
}

if (! function_exists('replaceNullWithEmptyStringRecursive')) {
    function replaceNullWithEmptyStringRecursive($array)
    {
        foreach ($array as &$value) {
            if (is_array($value)) {
                $value = replaceNullWithEmptyStringRecursive($value); // Recursively call the function for nested arrays
            } else {
                $value = $value ?? ''; // Replace null with an empty string
            }
        }
        return $array;
    }
}

if (! function_exists('replaceNullWithEmptyStringRecursive')) {
    function replaceNullWithEmptyStringRecursive($collection)
    {
        return $collection->transform(function ($item) {
            if ($item instanceof \Illuminate\Support\Collection) {
                return replaceNullWithEmptyStringRecursive($item); // Recursively call the function for nested collection
            }
            return $item ?? ''; // Replace null with an empty string
        });
    }
}

function isInstalled()
{
    if (!file_exists(storage_path('installed'))) {
        return false;
    }
    return true;
}

function isDemoMode()
{
    $isDemoMode = env('DEMO_MODE');
    return $isDemoMode;
}

/**
 * Demo flag exposed to clients as is_demo_mode_on (0/1). Apps use it to pre-fill or clear
 * the default login credentials. The admin toggle (Login Setting tab) writes DEMO_MODE to
 * .env, so this follows the same switch as isDemoMode().
 */
function isDemoModeOn()
{
    return filter_var(isDemoMode(), FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
}

function isDevMode()
{
    return env('DEV_MODE');
}

function currentVersion()
{
    $versionFilePath = base_path('version.txt');
    $version = file_get_contents($versionFilePath);
    $version = trim($version);
    if ($version == "") {
        $version = "4.0.2";
    }
    return $version;
}
function fixVersion()
{
    $versionFilePath = base_path('version.txt');
    $currentVersion = currentVersion();
    file_put_contents($versionFilePath, $currentVersion);
}
