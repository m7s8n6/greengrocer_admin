<?php

namespace App\Http\Controllers\API;
use App\Services\LanguageService;
use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\TimeSlot;
use App\Models\SubscriptionPlan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class TimeSlotsApiController extends Controller
{
    protected $languageService;

    public function __construct(LanguageService $languageService)
    {
        $this->languageService = $languageService;
    }
  
    public function checkActiveSubscriptionPlans()
    {
        try {
            $activePlans = SubscriptionPlan::where('status', 1)->count();
            
            return CommonHelper::responseWithData([
                'has_active_subscription_plans' => $activePlans > 0,
                'count' => $activePlans
            ]);
        } catch (\Exception $e) {
            return CommonHelper::responseError('something_went_wrong');
        }
    }

    public function index()
    {
        $moduleId = request()->header('X-Module-Id') ?: 1;

        $timeSlots = TimeSlot::with('translations')
            ->where('module_id', $moduleId)
            ->orderBy('id', 'desc')
            ->get();
    
        // Raw times as HH:mm for HTML <input type="time"> (Edit.vue). Table shows *_display via store time_format.
        $timeSlots = $timeSlots->map(function (TimeSlot $ts) {
            $row = $ts->toArray();

            foreach (['from_time', 'to_time', 'last_order_time'] as $field) {
                $raw = $ts->getRawOriginal($field) ?? $ts->getAttributes()[$field] ?? null;
                if ($raw instanceof \DateTimeInterface) {
                    $raw = $raw->format('H:i:s');
                }
                $rawStr = $raw !== null && $raw !== '' ? (string) $raw : '';
                if ($rawStr === '') {
                    continue;
                }
                try {
                    $parsed = Carbon::parse($rawStr);
                    // 24-hour string browsers accept for type="time"
                    $row[$field] = $parsed->format('H:i');
                    $formatted = CommonHelper::formatTime($rawStr);
                    $row[$field . '_display'] = $formatted !== '' ? $formatted : $row[$field];
                } catch (\Exception $e) {
                    $row[$field] = $rawStr;
                    $row[$field . '_display'] = $rawStr;
                }
            }

            return $row;
        });
    
        return CommonHelper::responseWithData($timeSlots);
    }

public function save(Request $request)
{
    $defaultLanguage = $this->languageService->getDefaultLanguage();
    $isDefaultLanguage = ($request->language_id == $defaultLanguage->id);
    $slotType = $request->slot_type === 'express' ? 'express' : 'fixed';
    if ($slotType === 'express' && !self::oneSellerCartOn()) {
        return CommonHelper::responseError('quick_delivery_requires_one_seller_cart');
    }

    // Base rules (always)
    $rules = [
        'language_id' => 'required|exists:languages,id',
        'title'       => 'required',
    ];

    // ONLY default language requires the type-specific fields - a fixed slot needs its clock
    // window, an express slot needs its duration (it has no from_time/to_time - it's relative
    // to whenever the order is placed).
    if ($isDefaultLanguage) {
        if ($slotType === 'express') {
            $rules['duration_minutes'] = 'required|integer|min:1';
        } else {
            $rules['from_time'] = 'required';
            $rules['to_time'] = 'required';
            $rules['last_order_time'] = 'required';
        }
    }

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return CommonHelper::responseError($validator->errors()->first());
    }

    // Quick Delivery is one global "ready in N minutes" setting per module, not a set of
    // windows to pick between like Fixed slots - so only one express slot may exist at a time.
    if ($isDefaultLanguage && $slotType === 'express') {
        $moduleId = $request->header('X-Module-Id') ?: 1;
        $existingExpress = TimeSlot::where('module_id', $moduleId)->where('slot_type', 'express')->exists();
        if ($existingExpress) {
            return CommonHelper::responseError('quick_delivery_slot_already_exists');
        }
    }

    // Create base record ONLY ONCE (default language)
    if ($isDefaultLanguage) {
        $timeSlot = new TimeSlot();
        $timeSlot->module_id = $request->header('X-Module-Id') ?: 1;
        $timeSlot->title = $request->title; // fallback title
        $timeSlot->slot_type = $slotType;
        if ($slotType === 'express') {
            $timeSlot->duration_minutes = $request->duration_minutes;
            $timeSlot->from_time = null;
            $timeSlot->to_time = null;
            $timeSlot->last_order_time = $request->last_order_time ?: null;
        } else {
            $timeSlot->from_time = $request->from_time;
            $timeSlot->to_time = $request->to_time;
            $timeSlot->last_order_time = $request->last_order_time;
            $timeSlot->duration_minutes = null;
        }
        $timeSlot->status = $request->status ?? 1;

        $timeSlot->is_free_delivery = $request->is_free_delivery ?? 0;
        $timeSlot->save();
    } else {
        // Find existing slot created by default language
        $timeSlot = TimeSlot::latest()->first();
    }

    // Save translation (ALL languages)
    $timeSlot->saveTranslation(
        $request->language_id,
        ['title' => $request->title]
    );

    return CommonHelper::responseWithData([
        'id' => $timeSlot->id,
        'message' => __('time_slot_saved_successfully')
    ]);
}

public function update(Request $request)
{
    $defaultLanguage = $this->languageService->getDefaultLanguage();
    $isDefaultLanguage = ($request->language_id == $defaultLanguage->id);
    $slotType = $request->slot_type === 'express' ? 'express' : 'fixed';
    if ($slotType === 'express' && !self::oneSellerCartOn()) {
        return CommonHelper::responseError('quick_delivery_requires_one_seller_cart');
    }

    $rules = [
        'id' => 'required|exists:time_slots,id',
        'language_id' => 'required|exists:languages,id',
        'title' => 'required',
    ];

    if ($isDefaultLanguage) {
        if ($slotType === 'express') {
            $rules['duration_minutes'] = 'required|integer|min:1';
        } else {
            $rules['from_time'] = 'required';
            $rules['to_time'] = 'required';
            $rules['last_order_time'] = 'required';
        }
    }

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return CommonHelper::responseError($validator->errors()->first());
    }

    $timeSlot = TimeSlot::find($request->id);
    if (!$timeSlot) {
        return CommonHelper::responseError('time_slot_not_found') ;
    }

    // Update base table ONLY for default language
    if ($isDefaultLanguage) {
        $timeSlot->title = $request->title;
        $timeSlot->slot_type = $slotType;
        if ($slotType === 'express') {
            $timeSlot->duration_minutes = $request->duration_minutes;
            $timeSlot->from_time = null;
            $timeSlot->to_time = null;
            $timeSlot->last_order_time = $request->last_order_time ?: null;
        } else {
            $timeSlot->from_time = $request->from_time;
            $timeSlot->to_time = $request->to_time;
            $timeSlot->last_order_time = $request->last_order_time;
            $timeSlot->duration_minutes = null;
        }
        $timeSlot->status = $request->status ?? $timeSlot->status;
        $timeSlot->is_free_delivery = $request->is_free_delivery ?? $timeSlot->is_free_delivery;
        $timeSlot->save();
    }

    // Save translation
    $timeSlot->saveTranslation(
        $request->language_id,
        ['title' => $request->title]
    );

    return CommonHelper::responseSuccess('time_slot_updated_successfully');
}

    public function delete(Request $request)
    {

        if (isset($request->id)) {

            $time_slots = TimeSlot::find($request->id);
            if ($time_slots) {
                $time_slots->delete();
                return CommonHelper::responseSuccess('time_slot_deleted_successfully');
            } else {
                return CommonHelper::responseSuccess("Time Slot Already Deleted!");
            }
        }
    }

    /** Quick Delivery needs a single pickup per order, so it requires One Seller Cart. */
    private static function oneSellerCartOn(): bool
    {
        return (int) trim((string) Setting::get_value('one_seller_cart')) === 1;
    }

    public function getTimeSlotsSettings(){
        // These five settings used to be one shared global row per key - switching module and
        // saving would silently overwrite every other module's Slot Type/Enable config too.
        // Suffixing each variable with the current module id makes them genuinely per-module.
        $moduleId = request()->header('X-Module-Id') ?: 1;
        $suffix = '_' . $moduleId;

        $timeSlot_settingsArray = array(
            "time_slot_type" => Setting::effectiveTimeSlotType($moduleId),
            "time_slots_is_enabled" => Setting::get_value('time_slots_is_enabled' . $suffix) ?: false,
            "time_slots_allowed_days" => Setting::get_value('time_slots_allowed_days' . $suffix) ?: '',
            "delivery_estimate_days" => Setting::get_value('delivery_estimate_days' . $suffix) ?: '',
        );
        $variables = array_map(fn ($key) => $key . $suffix, array_keys($timeSlot_settingsArray));
        $timeSlot_settings = Setting::whereIn('variable', $variables)->get();
        $data = array(
            "timeSlot_settingsObject" => $timeSlot_settingsArray,
            "timeSlot_settings" => $timeSlot_settings,
            "one_seller_cart" => self::oneSellerCartOn() ? 1 : 0,
        );
        return CommonHelper::responseWithData($data);

    }

    public function saveTimeSlotsSettings(Request  $request)
    {
        // "How many days you want to allow" is a day-ahead-ordering concept - meaningless once
        // slot_type is express (delivery is minutes from order time, not a day picker), so it's
        // only required for the fixed type.
        $rules = [];
        if ($request->time_slot_type !== 'express') {
            $rules['time_slots_allowed_days'] = 'required';
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if ($request->time_slot_type === 'express' && !self::oneSellerCartOn()) {
            return CommonHelper::responseError('quick_delivery_requires_one_seller_cart');
        }
        try {
            $moduleId = $request->header('X-Module-Id') ?: 1;
            $suffix = '_' . $moduleId;

            foreach ($request->all() as $key => $value) {
                $variable = $key . $suffix;
                $setting = Setting::where('variable', $variable)->first();

                if (empty($setting)) {
                    $setting = new Setting();
                }

                $setting->variable = $variable;
                // settings.value is NOT NULL - a field hidden by the UI (e.g. delivery_estimate_days
                // when slot_type is express) arrives as null after ConvertEmptyStringsToNull, which
                // would otherwise throw a DB integrity error here.
                $setting->value = $value ?? '';
                $setting->save();
            }

            return CommonHelper::responseSuccess("TimeSlots Settings Saved Successfully!");
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('saveTimeSlotsSettings failed: ' . $e->getMessage());

            return CommonHelper::responseError("Failed to save TimeSlots Settings. Please try again later.");
        }
    }
}
