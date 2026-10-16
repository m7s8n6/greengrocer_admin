<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\City;
use App\Models\CustomField;
use App\Models\DeliveryBoy;
use App\Models\Role;
use App\Models\Seller;
use App\Models\AdminToken;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $requestData = $request->all();
        $validator = Validator::make($requestData, [
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if ($request->type == 3) {
            $user = Admin::with('seller')->where('email', request()->email)->first();

            if (!$user || !$user->seller) {
                return CommonHelper::responseError('user_is_not_register_with_this_email_address');
            }
        } elseif ($request->type == 4) {
            $user = Admin::with('deliveryBoy')->where('email', request()->email)->first();
            if (!$user || !$user->deliveryBoy) {
                return CommonHelper::responseError('user_is_not_register_with_this_email_address');
            }
        } else {
            $user = Admin::where('email', request()->email)->first();
           
            if (!$user) {
                return CommonHelper::responseError('user_is_not_register_with_this_email_address');
            }
        }

        if (!Hash::check(request()->password, $user->password)) {
            return CommonHelper::responseError('email_password_is_wrong');
        }

        $otherRoleIds = array(Role::$roleSeller, Role::$roleDeliveryBoy);

        if ($user->role_id == Role::$roleSeller && isset($user->seller) && $user->seller->status == Seller::$statusRegistered) {
            return CommonHelper::responseError('your_request_under_review_you_will_get_notification_after_get_approval');
        }

        if ($user->role_id == Role::$roleSeller && isset($user->seller) && $user->seller->status == Seller::$statusRejected) {
            $data["status"] = $user->seller->status;
            $data["remark"] = $user->seller->remark ?? "";
            return CommonHelper::responseErrorWithData('your_request_rejected_please_contact_to_administrator_for_approval', $data);
        }

        if ($user->role_id == Role::$roleSeller && isset($user->seller) && $user->seller->status == Seller::$statusBlocked) {
            return CommonHelper::responseError('your_account_is_blocked_please_contact_to_administrator_for_activate');
        }

        //If delivery boy
        if ($user->role_id == Role::$roleDeliveryBoy && isset($user->deliveryBoy) && $user->deliveryBoy->status == DeliveryBoy::$statusRegistered) {
            return CommonHelper::responseError('your_request_under_review_you_will_get_notification_after_get_approval');
        }

        if ($user->role_id == Role::$roleDeliveryBoy && isset($user->deliveryBoy) && $user->deliveryBoy->status == DeliveryBoy::$statusRejected) {
            $data["status"] = $user->deliveryBoy->status;
            $data["remark"] = $user->deliveryBoy->remark ?? "";
            return CommonHelper::responseErrorWithData('your_request_rejected_please_contact_to_administrator_for_approval', $data);
        }

        if ($user->role_id == Role::$roleDeliveryBoy && isset($user->deliveryBoy) && $user->deliveryBoy->status == DeliveryBoy::$statusBlocked) {
            return CommonHelper::responseError('your_account_is_blocked_please_contact_to_administrator_for_activate');
        }

        Auth::login($user, false);

        if (isset($request->fcm_token) && !empty($request->fcm_token)) {
            $type = "";
            $user_id = $user->id;

            if ($user->role_id == Role::$roleSeller) {
                $type = Role::$roleNameSeller;
            } elseif ($user->role_id == Role::$roleDeliveryBoy) {
                $type = Role::$roleNameDeliveryBoy;
            } elseif ($user->role_id == Role::$roleAdmin) {
                $type = Role::$roleNameAdmin;
            } elseif ($user->role_id == Role::$roleSuperAdmin) {
                $type = Role::$roleNameSuperAdmin;
            }

            $language_id = $request->input('language_id') ?: CommonHelper::getDefaultLanguageId();
            AdminToken::updateOrCreate(
                ['user_id' => $user_id, 'fcm_token' => $request->fcm_token],
                ['type' => $type, 'platform' => $request->platform ?? 'android', 'language_id' => $language_id]
            );
        }

        $accessToken = $user->createToken('authToken')->accessToken;

        // Build user array; seller/delivery_boy name at root from main table (not lang-wise)
        $userArray = $user->toArray();
        if (!empty($userArray['seller'])) {
            $userArray['seller']['name'] = $user->seller->getAttributeValue('name') ?? '';
            $userArray['seller']['store_name'] = $user->seller->getAttributeValue('store_name') ?? '';
        }
        if ($user->deliveryBoy) {
            $key = isset($userArray['delivery_boy']) ? 'delivery_boy' : 'deliveryBoy';
            if (!empty($userArray[$key])) {
                $userArray[$key]['name'] = $user->deliveryBoy->getAttributeValue('name') ?? '';
            }
        }
        $res = ['user' => $userArray, 'access_token' => $accessToken];
        return CommonHelper::responseWithData($res);
    }

    public function logout(Request $request)
    {
        $token = $request->user()->token();
        if ($token) {
            $token->revoke();
        }
        if (isset($request->fcm_token)) {
            AdminToken::where('user_id', $request->user()->id)
                ->where('fcm_token', $request->fcm_token)
                ->delete();
        }
        return CommonHelper::responseSuccess(__('you_have_been_successfully_logged_out'));
    }

    public function forgetPassword(Request $request)
    {

        $requestData = $request->all();
        $validator = Validator::make($requestData, [
            'email' => 'required|email|exists:admins',
        ], [
            'email.exists' => "This Email is not registered, Please enter valid Email Address"
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $token = time() . Str::random(30);

        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        $data = array();
        $data['type'] = "forgot_password";
        $data['token'] = $token;
        CommonHelper::sendMail($request->email, "Reset Password", $data);

        return CommonHelper::responseSuccess('we_have_e_mailed_your_password_reset_link');
    }

    public function resetPassword(Request $request)
    {

        $requestData = $request->all();
        $validator = Validator::make($requestData, [
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required'
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $updatePassword = DB::table('password_resets')
            ->where(['token' => $request->token])
            ->first();

        if (!$updatePassword) {
            return CommonHelper::responseError('invalid_token');
        }

        $admin = Admin::where('email', $updatePassword->email)
            ->update(['password' => bcrypt($request->password)]);

        DB::table('password_resets')->where(['email' => $updatePassword->email])->delete();

        return CommonHelper::responseSuccess('password_updated_successfully');
    }

    /*Seller*/
    /**
     * Decode the custom_field_values payload (JSON string or array keyed by custom_field_id),
     * store any uploaded files for 'file' type custom fields (mirrors the same
     * time()_rand().ext + Storage::putFileAs pattern used for the other seller/delivery boy
     * uploads in this controller), verify every active + required custom field for the given
     * module has a non-empty value, and return the normalized array ready to be stored as JSON.
     *
     * Returns ['error' => 'message'] on validation failure, otherwise ['values' => array].
     */
    private function processCustomFieldValues(Request $request, $module, $storageFolder, array $extra = [])
    {
        $values = $request->input('custom_field_values');
        if (is_string($values)) {
            $decoded = json_decode($values, true);
            $values = json_last_error() === JSON_ERROR_NONE && is_array($decoded) ? $decoded : [];
        }
        if (!is_array($values)) {
            $values = [];
        }
        $values = array_replace($extra, $values);

        $customFields = CustomField::where('module', $module)->where('status', 1)->get();

        foreach ($customFields as $field) {
            if ($field->type !== 'file') {
                continue;
            }

            if ($request->hasFile('custom_field_file_' . $field->id)) {
                $file = $request->file('custom_field_file_' . $field->id);
                $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
                $values[$field->id] = Storage::disk('public')->putFileAs($storageFolder, $file, $fileName);
            }
        }

        foreach ($customFields as $field) {
            if (!$field->is_required) {
                continue;
            }
            $value = $values[$field->id] ?? null;
            if ($value === null || $value === '' || (is_array($value) && empty($value))) {
                return ['error' => $field->name . ' is required.'];
            }
        }

        return ['values' => $values];
    }

    /**
     * tax_name/tax_number/pan_number/national_id_card/address_proof/bank_* columns were dropped
     * from sellers - SellerRegister.vue and SellerDetails.vue still submit them under their old
     * plain field names, so map those onto the matching module=seller CustomField (seeded with
     * the same name in version_4_0_0) instead of a DB column.
     */
    private function sellerCustomFieldIds(): array
    {
        return CustomField::where('module', 'seller')
            ->whereIn('name', ['Tax Name', 'Tax Number', 'PAN Number', 'NID (National ID)', 'Address Proof', 'Bank Name', 'Bank A/C No.', 'Bank IFSC', 'A/C Name'])
            ->pluck('id', 'name')
            ->all();
    }

    private function mapLegacySellerFieldsToCustomFieldValues(Request $request, array $existingValues = []): array
    {
        $ids = $this->sellerCustomFieldIds();
        $values = $existingValues;

        $textFields = [
            'tax_name' => 'Tax Name',
            'tax_number' => 'Tax Number',
            'pan_number' => 'PAN Number',
            'bank_name' => 'Bank Name',
            'account_number' => 'Bank A/C No.',
            'ifsc_code' => 'Bank IFSC',
            'account_name' => 'A/C Name',
        ];
        foreach ($textFields as $requestKey => $fieldName) {
            if (!$request->filled($requestKey) || !isset($ids[$fieldName])) {
                continue;
            }
            $values[$ids[$fieldName]] = $request->input($requestKey);
        }

        $fileFields = [
            'national_id_card' => 'NID (National ID)',
            'address_proof' => 'Address Proof',
        ];
        foreach ($fileFields as $requestKey => $fieldName) {
            if (!$request->hasFile($requestKey) || !isset($ids[$fieldName])) {
                continue;
            }
            $file = $request->file($requestKey);
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $values[$ids[$fieldName]] = Storage::disk('public')->putFileAs('sellers', $file, $fileName);
        }

        return $values;
    }

    /**
     * Same idea as sellerCustomFieldIds()/mapLegacySellerFieldsToCustomFieldValues() above, for
     * delivery_boy - driving_license/national_identity_card/ifsc_code/bank_name/
     * bank_account_number/account_name/address/other_payment_information were dropped as columns.
     */
    private function deliveryBoyCustomFieldIds(): array
    {
        return CustomField::where('module', 'delivery_boy')
            ->whereIn('name', ['Driving License', 'National ID Card', 'Bank Name', 'Bank A/C No.', 'Bank IFSC Code', 'A/C Name', 'Address', 'Other Payment Info'])
            ->pluck('id', 'name')
            ->all();
    }

    private function mapLegacyDeliveryBoyFieldsToCustomFieldValues(Request $request, array $existingValues = []): array
    {
        $ids = $this->deliveryBoyCustomFieldIds();
        $values = $existingValues;

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
            $file = $request->file($requestKey);
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $values[$ids[$fieldName]] = Storage::disk('public')->putFileAs($folder, $file, $fileName);
        }

        return $values;
    }

    public function sellerRegister(Request $request)
    {
        $requestData = $request->all();
        $validator = Validator::make($requestData, [
            'name' => 'required',
            'email' => 'email|required|unique:admins',
            'mobile' => 'required',
            'password' => 'min:6|required_with:confirm_password|same:confirm_password',
            'categories_ids' => 'required',
            'store_name' => 'required',
            'city_id' => 'required',
            'commission' => 'required',
            'store_logo' => 'required|mimes:jpeg,jpg,png,gif,webp,pdf',
            'store_description' => 'required',
            'module_id' => 'required|exists:modules,id',
        ], [
            'email.unique' => 'The :attribute has already been taken.',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $customFieldResult = $this->processCustomFieldValues($request, 'seller', 'sellers', $this->mapLegacySellerFieldsToCustomFieldValues($request));
        if (isset($customFieldResult['error'])) {
            return CommonHelper::responseError($customFieldResult['error']);
        }

        DB::beginTransaction();
        try {
            $admin = Admin::create([
                'username' =>  $request->name,
                'store_name' => $request->store_name ?? "",
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role_id' => Role::$roleSeller,
                'created_by' => 0,
            ]);
            $seller = new Seller();
            $seller->admin_id = $admin->id;
            $seller->module_id = $request->module_id ?: 1;
            $seller->name = $request->name;
            $seller->slug = $request->store_name ?? "";
            $seller->store_name = $request->store_name;
            $seller->email = $request->email;
            $seller->mobile = $request->mobile;
            $seller->status = Seller::$statusRegistered;
            $seller->store_url = $request->store_url;
            $seller->categories = $request->categories_ids;
            $seller->city_id = $request->city_id;
            $seller->store_description = $request->store_description;
            $seller->commission = $request->commission;

            // Store latitude and longitude from the selected city
            $city = City::find($request->city_id);
            if ($city) {
                $seller->latitude = $city->latitude;
                $seller->longitude = $city->longitude;
                $seller->formatted_address = $city->formatted_address;
                $seller->place_name = $city->zone;
                $seller->street = $city->formatted_address;
            }

            if ($request->hasFile('store_logo')) {
                $file = $request->file('store_logo');
                $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('sellers', $file, $fileName);
                $seller->logo = $image;
            }

            $seller->custom_field_values = $customFieldResult['values'];
            $seller->save();

            try {
                CommonHelper::sendMailAdminStatus("seller", $seller, $seller->status, $request->email);
            } catch (\Exception $e) {
                Log::error("Register Seller status send mail error", [$e->getMessage()]);
            }

            DB::commit();
            return CommonHelper::responseSuccess('seller_registration_successful_your_request_send_to_admin_and_will_approve_soon_thank_you');
        } catch (\Exception $e) {
            Log::info("Seller Register Error : ", [$e->getMessage()]);
            DB::rollBack();
            return CommonHelper::responseError('something_went_wrong');
        }
    }

    public function saveSellerDetails(Request $request)
    {
        $admin = auth()->user();

        $record = Seller::where('admin_id', $admin->id)->first();
        if (!$record) {
            $record = new Seller();
            $record->admin_id = $admin->id;
            $record->name = $admin->username;
            $record->email = $admin->email;
            $record->status = Seller::$statusRegistered;
            $record->save();
        }

        $customFieldIds = $this->sellerCustomFieldIds();
        $existingCustomFieldValues = $record->custom_field_values ?? [];
        $hasNationalIdCard = !empty($existingCustomFieldValues[$customFieldIds['NID (National ID)'] ?? null] ?? null);
        $hasAddressProof = !empty($existingCustomFieldValues[$customFieldIds['Address Proof'] ?? null] ?? null);

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'email|required|unique:admins,email,' . auth()->user()->id,
            'store_name' => 'required',

            'store_logo' => ($record->logo == "") ? 'required|' : '' . 'mimes:jpeg,jpg,png,gif,webp,pdf',
            'national_id_card' => (!$hasNationalIdCard) ? 'required|' : '' . 'mimes:jpeg,jpg,png,gif,webp,pdf',
            'address_proof' => (!$hasAddressProof) ? 'required|' : '' . 'mimes:jpeg,jpg,png,gif,webp,pdf',

            'street' => 'required',
            'city_id' => 'required',
            'state' => 'required',
            'categories_ids' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'place_name' => 'required',
            'formatted_address' => 'required',
            'store_description' => 'required',
            'module_id' => 'nullable|exists:modules,id',
        ], [
            'email.unique' => 'The :attribute has already been taken.',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $record->name = $request->name;
        $record->email = $request->email;
        $record->mobile = $request->mobile;
        $record->store_url = $request->store_url;
        $record->store_name = $request->store_name;
        $record->street = $request->street;
        $record->pincode_id = ($request->pincode_id) ?? 0;
        $record->city_id = $request->city_id;
        $record->state = $request->state;
        $record->categories = $request->categories_ids;
        $record->latitude = $request->latitude;
        $record->longitude = $request->longitude;
        $record->place_name = $request->place_name;
        $record->formatted_address = $request->formatted_address;
        $record->store_description = $request->store_description;

        if (!$record->module_id) {
            $record->module_id = $request->module_id ?: 1;
        }

        if ($record->status == Seller::$statusRegistered) {
            $record->require_products_approval = $request->require_products_approval ?? 0;
            $record->customer_privacy = $request->customer_privacy ?? 0;
            $record->view_order_otp = $request->view_order_otp ?? 0;
            $record->assign_delivery_boy = $request->assign_delivery_boy ?? 0;
            $record->change_order_status_delivered = $request->change_order_status_delivered ?? 0;
        }

        if ($request->hasFile('store_logo')) {
            $file = $request->file('store_logo');
            $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
            $image = Storage::disk('public')->putFileAs('sellers', $file, $fileName);
            $record->logo = $image;
        }

        $record->custom_field_values = $this->mapLegacySellerFieldsToCustomFieldValues($request, $existingCustomFieldValues);
        $record->save();

        if ($record->status == Seller::$statusRegistered) {
            return CommonHelper::responseSuccess('your_request_send_to_admin_and_will_approve_soon_thank_you');
        } else {
            return CommonHelper::responseSuccess('your_updated_successfully_thank_you');
        }
    }

    /*Delivery Boy*/
    public function deliveryBoyRegister(Request $request)
    {

        $requestData = $request->all();
        $validator = Validator::make($requestData, [
            'name' => 'required',
            'email' => 'email|required|unique:admins',
            'mobile' => 'required',
            'dob' => 'required',
            'password' => 'min:6|required_with:confirm_password|same:confirm_password',
            'city_id' => 'required',
            'bonus_type' => 'required',
            'bonus_percentage' => $request->bonus_type == 1 ? 'required' : '',
        ], [
            'email.unique' => 'The :attribute has already been taken.',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $customFieldResult = $this->processCustomFieldValues($request, 'delivery_boy', 'delivery_boy/custom_fields', $this->mapLegacyDeliveryBoyFieldsToCustomFieldValues($request));
        if (isset($customFieldResult['error'])) {
            return CommonHelper::responseError($customFieldResult['error']);
        }

        DB::beginTransaction();
        try {
            $data = array();
            $data['username'] = $request->name;
            $data['email'] = $request->email;
            $data['password'] = bcrypt($request->password);
            $data['role_id'] = Role::$roleDeliveryBoy;
            $data['created_by'] = 0;
            $admin = Admin::create($data);

            $deliveryBoy = new DeliveryBoy();
            $deliveryBoy->city_id = $request->city_id;
            $deliveryBoy->admin_id = $admin->id;
            $deliveryBoy->name = $request->name;
            $deliveryBoy->mobile = $request->mobile;
            $deliveryBoy->dob = $request->dob;
            $deliveryBoy->bonus_type = $request->bonus_type;
            $deliveryBoy->bonus_percentage =  $request->bonus_percentage ?? 0;

            $deliveryBoy->status = DeliveryBoy::$statusRegistered;

            $deliveryBoy->custom_field_values = $customFieldResult['values'];
            $deliveryBoy->save();

            try {
                CommonHelper::sendMailAdminStatus("delivery_boy", $deliveryBoy, $deliveryBoy->status, $request->email);
            } catch (\Exception $e) {
                Log::error("Register delivery_boy status send mail error", [$e->getMessage()]);
            }

            DB::commit();
            return CommonHelper::responseSuccess('delivery_boy_registration_successful');
        } catch (\Exception $e) {
            Log::info("Delivery Boy Register Error : ", [$e->getMessage()]);
            DB::rollBack();
            return CommonHelper::responseError('something_went_wrong');
        }
    }
    public function saveDeliveryBoyDetails(Request $request)
    {
        $admin = auth()->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'mobile' => 'required',
            'dob' => 'required',
            // 'driving_license' => 'required|mimes:jpeg,jpg,png,gif,webp,pdf',
            // 'national_identity_card' => 'required|mimes:jpeg,jpg,png,gif,webp,pdf',
            'ifsc_code' => 'required',
            'bank_name' => 'required',
            'bank_account_number' => 'required',
            'account_name' => 'required',
            'city_id' => 'required',
            'address' => 'required'
        ], [
            'email.unique' => 'The :attribute has already been taken.',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $deliveryBoy = new DeliveryBoy();
        $deliveryBoy->admin_id = $admin->id;
        $deliveryBoy->name = $admin->username;
        $deliveryBoy->status = DeliveryBoy::$statusRegistered;
        $deliveryBoy->name = $request->name;
        $deliveryBoy->mobile = $request->mobile;
        $deliveryBoy->dob = $request->dob;
        $deliveryBoy->city_id = $request->city_id;
        $deliveryBoy->custom_field_values = $this->mapLegacyDeliveryBoyFieldsToCustomFieldValues($request);
        $deliveryBoy->save();

        if ($deliveryBoy->status == DeliveryBoy::$statusRegistered) {
            return CommonHelper::responseSuccess('your_request_send_to_admin_and_will_approve_soon_thank_you');
        } else {
            return CommonHelper::responseSuccess('your_updated_successfully_thank_you');
        }
    }

    public function validateLogin()
    {
        $login = validateLogin();
        if (isset($login['is_login']) && $login['is_login'] == true) {
            return CommonHelper::responseSuccess('success');
        }
        return CommonHelper::responseError('success');
    }

    public function addFcmToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fcm_token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user = $request->user('api');
        $user_id = $user ? $user->id : 0;
        $type = $this->getAdminRoleType($user);
        $language_id = $request->input('language_id') ?: CommonHelper::getDefaultLanguageId();

        $token = AdminToken::where('fcm_token', $request->fcm_token)->first();

        if ($token) {
            if ($token->user_id == 0 && $user_id != 0) {
                $token->user_id = $user_id;
                $token->type = $type;
                $token->platform = $request->platform ?? 'android';
                $token->language_id = $language_id;
                $token->save();
                return CommonHelper::responseSuccess(__('token_updated_successfully'));
            }
            if ($request->has('language_id')) {
                $token->language_id = $language_id;
                $token->save();
            }
            return CommonHelper::responseSuccess(__('token_already_exists'));
        }

        // A new token for this user+type+platform means the old one is stale (reinstall, re-login,
        // FCM refresh) - without removing it, both rows get pushed to and the same physical device
        // receives every notification twice.
        // if ($user_id != 0) {
        //     AdminToken::where('user_id', $user_id)
        //         ->where('type', $type)
        //         ->where('platform', $request->platform ?? 'android')
        //         ->where('fcm_token', '!=', $request->fcm_token)
        //         ->delete();
        // }

        AdminToken::create([
            'user_id' => $user_id,
            'type' => $type,
            'fcm_token' => $request->fcm_token,
            'platform' => $request->platform ?? 'android',
            'language_id' => $language_id,
        ]);

        return CommonHelper::responseSuccess(__('token_added_successfully'));
    }

    public function updateFcmToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fcm_token' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user = $request->user('api');
        $user_id = $user ? $user->id : 0;
        $type = $this->getAdminRoleType($user);

        $token = AdminToken::where('fcm_token', $request->fcm_token)->first();
        $language_id = $request->input('language_id') ?: CommonHelper::getDefaultLanguageId();

        if ($token && ($token->user_id == 0 || $token->user_id == '')) {
            $token->user_id = $user_id;
            $token->type = $type;
            $token->platform = $request->platform ?? 'android';
            $token->language_id = $language_id;
            $token->save();
            return CommonHelper::responseSuccess(__('token_updated_successfully'));
        }
        if ($token && $request->has('language_id')) {
            $token->language_id = $language_id;
            $token->save();
        }

        // Same reason as addFcmToken() - drop any other token row for this user+type+platform so
        // a refreshed/re-registered token doesn't leave the old one still receiving pushes too.
        // if ($user_id != 0) {
        //     AdminToken::where('user_id', $user_id)
        //         ->where('type', $type)
        //         ->where('platform', $request->platform ?? 'android')
        //         ->where('fcm_token', '!=', $request->fcm_token)
        //         ->delete();
        // }

        AdminToken::updateOrCreate(
            ['user_id' => $user_id, 'fcm_token' => $request->fcm_token],
            ['type' => $type, 'platform' => $request->platform ?? 'android', 'language_id' => $language_id]
        );
        return CommonHelper::responseSuccess(__('token_added_successfully'));
    }

    private function getAdminRoleType($user)
    {
        if (!$user || !isset($user->role_id)) {
            return Role::$roleNameAdmin;
        }
        if ($user->role_id == Role::$roleSeller) {
            return Role::$roleNameSeller;
        }
        if ($user->role_id == Role::$roleDeliveryBoy) {
            return Role::$roleNameDeliveryBoy;
        }
        if ($user->role_id == Role::$roleSuperAdmin) {
            return Role::$roleNameSuperAdmin;
        }
        return Role::$roleNameAdmin;
    }
}
