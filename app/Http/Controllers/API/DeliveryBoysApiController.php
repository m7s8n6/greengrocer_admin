<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\CustomField;
use App\Models\DeliveryBoy;
use App\Models\Role;
use App\Services\LanguageService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DeliveryBoysApiController extends Controller
{
    protected $languageService;

    public function __construct(LanguageService $languageService)
    {
        $this->languageService = $languageService;
    }

    /**
     * driving_license/national_identity_card/ifsc_code/bank_name/bank_account_number/
     * account_name/address/other_payment_information were dropped as columns - EditDeliveryBoy.vue
     * still submits them under their old plain field names, so map those onto the matching
     * module=delivery_boy CustomField (seeded with the same name in version_4_0_0).
     */
    private function legacyDeliveryBoyFieldIds(): array
    {
        return CustomField::where('module', 'delivery_boy')
            ->whereIn('name', ['Driving License', 'National ID Card', 'Bank Name', 'Bank A/C No.', 'Bank IFSC Code', 'A/C Name', 'Address', 'Other Payment Info'])
            ->pluck('id', 'name')
            ->all();
    }

    private function mapLegacyDeliveryBoyFields(Request $request, array $values): array
    {
        $ids = $this->legacyDeliveryBoyFieldIds();

        $textFields = [
            'ifsc_code' => 'Bank IFSC Code',
            'bank_name' => 'Bank Name',
            'bank_account_number' => 'Bank A/C No.',
            'account_name' => 'A/C Name',
            'address' => 'Address',
            'other_payment_information' => 'Other Payment Info',
        ];
        foreach ($textFields as $requestKey => $fieldName) {
            if (!$request->filled($requestKey) || !isset($ids[$fieldName])) {
                continue;
            }
            $values[$ids[$fieldName]] = $request->input($requestKey);
        }

        $fileFields = [
            'driving_license' => ['Driving License', 'delivery_boy/driving_license'],
            'national_identity_card' => ['National ID Card', 'delivery_boy/national_identity_card'],
        ];
        foreach ($fileFields as $requestKey => [$fieldName, $folder]) {
            if (!$request->hasFile($requestKey) || !isset($ids[$fieldName])) {
                continue;
            }
            $values[$ids[$fieldName]] = Storage::disk('public')->putFile($folder, $request->file($requestKey));
        }

        return $values;
    }

    /**
     * Decode custom_field_values (JSON string or array keyed by custom_field_id) coming from
     * the admin panel create/edit forms, map in the legacy plain-named fields above, store any
     * uploaded files for 'file' type custom fields, and return a plain array ready to be stored
     * as JSON.
     */
    private function normalizeCustomFieldValues(Request $request, $existing = [])
    {
        $values = is_array($existing) ? $existing : [];

        $submitted = $request->input('custom_field_values');
        if (is_string($submitted)) {
            $decoded = json_decode($submitted, true);
            $submitted = json_last_error() === JSON_ERROR_NONE && is_array($decoded) ? $decoded : [];
        }
        if (is_array($submitted)) {
            $values = array_replace($values, $submitted);
        }

        $values = $this->mapLegacyDeliveryBoyFields($request, $values);

        $fileFields = CustomField::where('module', 'delivery_boy')->where('type', 'file')->get();
        foreach ($fileFields as $field) {
            if ($request->hasFile('custom_field_file_' . $field->id)) {
                $values[$field->id] = Storage::disk('public')
                    ->putFile('delivery_boy/custom_fields', $request->file('custom_field_file_' . $field->id));
            }
        }

        return $values;
    }

    public function getDeliveryBoyBonusSettings()
    {
        $bonus = CommonHelper::getDeliveryBoyBonusSettings();
        if (empty($bonus)) {
            return CommonHelper::responseError("Default bonus not found.");
        }
        return CommonHelper::responseWithData($bonus);
    }

    public function getDeliveryBoy(Request $request)
    {
        $query = DeliveryBoy::withAllTranslations()
            ->with(['admin', 'city'])
            ->orderBy('id', 'DESC');

        if ($request->filled('filterStatus')) {
            $query->where('status', $request->filterStatus);
        }

        if ($request->filled('city_id')) {
            $query->where('city_id', $request->city_id)
                ->where('status', 1);
        }

        $deliveryBoys = $query->get();
        foreach ($deliveryBoys as $db) {
            $db->email = $db->admin ? $db->admin->email : '';
        }

        $deliveryBoysForResponse = $deliveryBoys->map(function (DeliveryBoy $db) {
            $row = $db->toArray();
            $rawCreated = $db->getAttributes()['created_at'] ?? null;
            if ($rawCreated !== null && $rawCreated !== '') {
                $row['created_at'] = CommonHelper::formatDateTime($rawCreated);
            }
            $rawDob = $db->getAttributes()['dob'] ?? null;
            if ($rawDob !== null && $rawDob !== '') {
                $row['dob'] = CommonHelper::formatDate($rawDob);
            }
            return $row;
        });

        return CommonHelper::responseWithData($deliveryBoysForResponse);
    }

    public function edit($id)
    {
        $deliveryBoy = DeliveryBoy::withAllTranslations()
            ->with(['admin.deliveryBoy', 'city:id,name', 'translations'])
            ->where('id', $id)->first();
        if (!$deliveryBoy) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        // Add city information to the admin's deliveryBoy object as an array
        if ($deliveryBoy->city && $deliveryBoy->admin && $deliveryBoy->admin->deliveryBoy) {
            $deliveryBoy->admin->deliveryBoy->cities = [$deliveryBoy->city];
        }

        DeliveryBoy::setOptimizedResponse(false);

        return CommonHelper::responseWithData($deliveryBoy);
    }
    public function save(Request $request)
    {
        $rules = [
            'language_id' => 'required|exists:languages,id',
            'name'        => 'required',
        ];

        $defaultLanguage = $this->languageService->getDefaultLanguage();

        if ($request->language_id == $defaultLanguage->id) {
            $rules = array_merge($rules, [
                'dob' => 'required',
                'mobile' => 'required',
                'email' => 'email|required|unique:admins,email',
                'password' => 'required',
                'confirm_password' => 'required|same:password',
                'city_id' => 'required',
                'driving_license' => 'nullable|file',
                'national_identity_card' => 'nullable|file',
                'bonus_percentage' => $request->bonus_type == 1 ? 'required|numeric|min:0.1' : 'nullable'
            ]);
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        if ($request->language_id != $defaultLanguage->id) {
            return CommonHelper::responseError('default_language_required_first');
        }

        DB::beginTransaction();
        try {
            /** Admin */
            $admin = Admin::create([
                'username' => $request->name,
                'email'    => $request->email,
                'password' => bcrypt($request->password),
                'role_id'  => Role::$roleDeliveryBoy,
                'created_by' => 0,
            ]);

            /** DeliveryBoy main table */
            $deliveryBoy = DeliveryBoy::create([
                'admin_id' => $admin->id,
                'name'     => $request->name,
                'mobile'   => $request->mobile,
                'dob'      => $request->dob,
                'city_id'  => $request->city_id,
                'bonus_type' => $request->bonus_type ?? 0,
                'bonus_percentage' => $request->bonus_percentage ?? 0,
                'bonus_min_amount' => $request->bonus_min_amount ?? 0,
                'bonus_max_amount' => $request->bonus_max_amount ?? 0,
                'status'   => DeliveryBoy::$statusActive,
            ]);

            $deliveryBoy->custom_field_values = $this->normalizeCustomFieldValues($request);
            $deliveryBoy->save();

            /* Save Translation */
            $deliveryBoy->saveTranslation($request->language_id, [
                'name'  => $request->name ?? '',
            ]);

            DB::commit();

            return CommonHelper::responseWithData([
                'id' => $deliveryBoy->id,
                'message' => __('delivery_boy_saved_successfully'),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("DeliveryBoy Save Error", [$e->getMessage()]);
            return CommonHelper::responseError('something_went_wrong');
        }
    }


    public function update(Request $request)
    {
        $defaultLanguage = $this->languageService->getDefaultLanguage();
        $isDefaultLang   = $defaultLanguage && (int) $request->language_id === (int) $defaultLanguage->id;

        $rules = [
            'id'          => 'required|exists:delivery_boys,id',
            'language_id' => 'required|exists:languages,id',
            'name'        => $isDefaultLang ? 'required' : 'nullable|string',
        ];

        // If password is filled, confirm_password is required and must match
        if ($request->filled('password')) {
            $rules['password'] = 'required|min:6';
            $rules['confirm_password'] = 'required|same:password';
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $deliveryBoy = DeliveryBoy::find($request->id);
        if (!$deliveryBoy) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        // For default language updates, validate email uniqueness in admins table (per admin record).
        if ($isDefaultLang && $request->filled('email')) {
            $emailValidator = Validator::make($request->all(), [
                'email' => [
                    'required',
                    'email',
                    Rule::unique('admins', 'email')->ignore($deliveryBoy->admin_id),
                ],
            ]);
            if ($emailValidator->fails()) {
                return CommonHelper::responseError($emailValidator->errors()->first());
            }
        }


        /** Update main table only for default language */
        if ($request->language_id == $defaultLanguage->id) {
            $deliveryBoy->name = $request->name;
            $deliveryBoy->mobile = $request->mobile ?? $deliveryBoy->mobile;
            $deliveryBoy->dob    = $request->dob ?? $deliveryBoy->dob;
            $deliveryBoy->city_id = $request->city_id ?? $deliveryBoy->city_id;
            $deliveryBoy->status = $request->status ?? $deliveryBoy->status;
            // Remark field - always update (can be empty string)
            $deliveryBoy->remark = $request->input('remark', '');

            // Bonus details
            $deliveryBoy->bonus_type = $request->bonus_type ?? $deliveryBoy->bonus_type ?? 0;
            $deliveryBoy->bonus_percentage = $request->bonus_percentage ?? $deliveryBoy->bonus_percentage ?? 0;
            $deliveryBoy->bonus_min_amount = $request->bonus_min_amount ?? $deliveryBoy->bonus_min_amount ?? 0;
            $deliveryBoy->bonus_max_amount = $request->bonus_max_amount ?? $deliveryBoy->bonus_max_amount ?? 0;

            $deliveryBoy->custom_field_values = $this->normalizeCustomFieldValues($request, $deliveryBoy->custom_field_values ?? []);

            $deliveryBoy->save();

            // Update Admin password when password is provided
            if ($request->filled('password')) {
                $admin = Admin::find($deliveryBoy->admin_id);
                if ($admin) {
                    $admin->password = bcrypt($request->password);
                    $admin->save();
                }
            }

            // Update Admin email when provided (after passing uniqueness validation above).
            if ($request->filled('email')) {
                $admin = Admin::find($deliveryBoy->admin_id);
                if ($admin) {
                    $admin->email = $request->email;
                    $admin->save();
                }
            }
        }

        /**  Save or Update Translation (all languages) */
        $deliveryBoy->saveTranslation($request->language_id, [
            'name'  => $request->name ?? '',
        ]);

        /** Return latest delivery boy with current language translation */
        $deliveryBoy = DeliveryBoy::withTranslation()->find($request->id);


        return CommonHelper::responseWithData([
            'delivery_boy' => $deliveryBoy,
            'message' => __('delivery_boy_updated_successfully'),
        ]);
    }

    public function updateStatus(Request $request)
    {
        if (isset($request->id)) {
            $deliveryBoy = DeliveryBoy::find($request->id);

            if ($deliveryBoy) {
                $deliveryBoy->status = $request->status;
                $deliveryBoy->remark = $request->remark ?? "";
                $deliveryBoy->save();

                if (isset($request->status) && $request->status === DeliveryBoy::$statusActive) {
                    $status_name = DeliveryBoy::$Active;
                } else {
                    $status_name = DeliveryBoy::$Rejected;
                }

                $user = Admin::where('id', $deliveryBoy->admin_id)->first();

                try {
                    CommonHelper::sendMailAdminStatus("delivery_boy", $deliveryBoy, $deliveryBoy->status, $user->email);
                } catch (\Exception $e) {
                    Log::error("Approve delivery_boy status send mail error", [$e->getMessage()]);
                }

                return CommonHelper::responseSuccess(__('delivery_boy_status_updated_successfully', ['status' => $status_name]));
            } else {
                return CommonHelper::responseSuccess(__('delivery_boy_not_found'));
            }
        }
    }

    public function delete(Request $request)
    {
        $deliveryBoy = DeliveryBoy::find($request->id);

        if ($deliveryBoy) {
            foreach (($deliveryBoy->custom_field_values ?? []) as $value) {
                if (is_string($value) && Storage::disk('public')->exists($value)) {
                    @Storage::disk('public')->delete($value);
                }
            }
            $deliveryBoy->delete();
        }

        return CommonHelper::responseSuccess('delivery_boy_deleted_successfully');
    }

    public function getStatus(Request $request)
    {
        // Try to get delivery boy ID from request or authenticated user
        $delivery_boy_id = $request->id ?? null;

        // If no ID in request, try to get from authenticated user's delivery_boy relationship
        if (!$delivery_boy_id && auth()->check()) {
            // Get delivery boy by admin_id (more reliable than relationship)
            $deliveryBoy = DeliveryBoy::where('admin_id', auth()->user()->id)->first();
            if ($deliveryBoy) {
                $delivery_boy_id = $deliveryBoy->id;
            }
        }

        if (!$delivery_boy_id) {
            return CommonHelper::responseError('delivery_boy_id_is_required');
        }

        $deliveryBoy = DeliveryBoy::find($delivery_boy_id);

        if (!$deliveryBoy) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        $data = ['status' => $deliveryBoy->status, 'remark' => $deliveryBoy->remark];
        return CommonHelper::responseWithData($data);
    }

    public function getSalary(Request $request)
    {
        try {
            $query = DB::table('delivery_boy_salary as s')
                ->leftJoin('delivery_boys as d', 'd.id', '=', 's.delivery_boy_id')
                ->select(
                    's.*',
                    'd.name as delivery_boy_name'
                )
                ->orderBy('s.id', 'DESC');

            if ($request->filled('startDate')) {
                $query->whereDate('s.paid_on', '>=', $request->startDate);
            }

            if ($request->filled('endDate')) {
                $query->whereDate('s.paid_on', '<=', $request->endDate);
            }

            $user = auth('api')->user();
            if ($user && $user->role_id == \App\Models\Role::$roleDeliveryBoy) {
                $deliveryBoy = $user->deliveryBoy;
                if ($deliveryBoy) {
                    $query->where('s.delivery_boy_id', $deliveryBoy->id);
                } else {
                    $query->where('s.delivery_boy_id', 0);
                }
            } else {
                if ($request->filled('delivery_boy_id')) {
                    $query->where('s.delivery_boy_id', $request->delivery_boy_id);
                }
            }

            $salaries = $query->get();

            if ($user && $user->role_id == \App\Models\Role::$roleDeliveryBoy) {
                $deliveryBoy = $user->deliveryBoy;
                if ($deliveryBoy) {
                    $deliveryBoys = DeliveryBoy::where('id', $deliveryBoy->id)->select('id', 'name', 'mobile')->get();
                } else {
                    $deliveryBoys = [];
                }
            } else {
                $deliveryBoys = DeliveryBoy::select('id', 'name', 'mobile')->get();
            }

            return CommonHelper::responseWithData([
                'salaries' => $salaries,
                'deliveryBoys' => $deliveryBoys,
                'date_format' => CommonHelper::getDateFormat(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
            ]);
        }
    }
    public function addSalary(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'delivery_boy_id' => 'required|exists:delivery_boys,id',
            'amount' => 'required|numeric',
            'paid_on' => 'required|date'
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        try {
            DB::table('delivery_boy_salary')->insert([
                'delivery_boy_id' => $request->delivery_boy_id,
                'amount' => $request->amount,
                'message' => $request->message ?? '',
                'paid_on' => $request->paid_on,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return CommonHelper::responseSuccess('salary_added_successfully');
        } catch (\Exception $e) {
            Log::error("Add Salary Error", [$e->getMessage()]);
            return CommonHelper::responseError('something_went_wrong');
        }
    }
    public function updateSalary(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:delivery_boy_salary,id',
            'delivery_boy_id' => 'required|exists:delivery_boys,id',
            'amount' => 'required|numeric',
            'paid_on' => 'required|date'
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        try {
            DB::table('delivery_boy_salary')
                ->where('id', $request->id)
                ->update([
                    'delivery_boy_id' => $request->delivery_boy_id,
                    'amount' => $request->amount,
                    'message' => $request->message ?? '',
                    'paid_on' => $request->paid_on,
                    'updated_at' => now(),
                ]);

            return CommonHelper::responseSuccess('salary_updated_successfully');
        } catch (\Exception $e) {
            Log::error("Update Salary Error", [$e->getMessage()]);
            return CommonHelper::responseError('something_went_wrong');
        }
    }
    public function deleteSalary(Request $request)
    {
        if (!$request->id) {
            return CommonHelper::responseError('id_required');
        }

        try {
            DB::table('delivery_boy_salary')->where('id', $request->id)->delete();
            return CommonHelper::responseSuccess('salary_deleted_successfully');
        } catch (\Exception $e) {
            Log::error("Delete Salary Error", [$e->getMessage()]);
            return CommonHelper::responseError('something_went_wrong');
        }
    }
    public function getMySalary(Request $request)
    {
        try {
            // Get the delivery boy record linked to the logged-in user
            $deliveryBoy = auth('api')->user()->deliveryBoy;

            if (!$deliveryBoy) {
                return CommonHelper::responseError('No delivery boy record found');
            }

            $deliveryBoyId = $deliveryBoy->id;
            $query = DB::table('delivery_boy_salary as s')
                ->leftJoin('delivery_boys as d', 'd.id', '=', 's.delivery_boy_id')
                ->where('s.delivery_boy_id', $deliveryBoyId)
                ->select(
                    's.id',
                    's.amount',
                    's.message',
                    's.paid_on',
                    'd.name as delivery_boy_name'
                )
                ->orderBy('s.id', 'DESC');

            // Filters
            if ($request->filled('startDate')) {
                $query->whereDate('s.paid_on', '>=', $request->startDate);
            }

            if ($request->filled('endDate')) {
                $query->whereDate('s.paid_on', '<=', $request->endDate);
            }

            $limit = $request->input('limit', 10);
            $offset = $request->input('offset', 0);

            $total = (clone $query)->count();
            $dateFormat = CommonHelper::getDateFormat();

            $salaries = $query->limit($limit)->offset($offset)->get()->map(function ($item) {
                $item->paid_on = CommonHelper::formatDate($item->paid_on);
                return $item;
            });

            return response()->json([
                'status' => 1,
                'message' => 'Success',
                'data' => [
                    'salaries' => $salaries,
                    'total' => $total,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error("Delivery Boy Salary Error", [
                'message' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }
}
