<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\City;
use App\Models\CustomField;
use App\Models\DeliveryBoy;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

/**
 * Seller's own delivery-boy fleet (docs/auto-assign-delivery-boy-plan.md §2b). Entirely
 * new surface - previously sellers only had a read-only, city-filtered view into the
 * shared pool (SellerController::getDeliveryBoys), which is untouched by this file.
 *
 * `sellers.delivery_boy_source` (shared vs own) is admin-only: chosen once at seller
 * registration (AdminAuthController::sellerRegister) and changeable afterward only by
 * an admin (SellerApiController::update) - a seller can never set/change it themselves.
 * There used to be a seller-facing saveSource() here; removed per that decision. There
 * also used to be a separate module-level `allow_seller_owned_fleet` gate on top of this
 * - removed too, since the admin already has full per-seller control via
 * `delivery_boy_source` directly, making a second module-wide switch redundant.
 *
 * Every write here (driver CRUD) is scoped to `seller_id = auth()->user()->seller->id`
 * and gated purely on this seller's own `delivery_boy_source === 'own'`.
 */
class SellerDeliveryFleetApiController extends Controller
{
    private function currentSeller()
    {
        return auth()->user()->seller ?? null;
    }

    /**
     * This seller's admin-assigned shared/own choice - the seller panel UI uses this to
     * show/hide the driver-management table (read-only, cannot switch it themselves).
     */
    public function status()
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        return CommonHelper::responseWithData([
            // 'shared' whenever the admin's global switch is off, whatever the seller chose.
            'delivery_boy_source' => $seller->usesOwnFleet() ? 'own' : 'shared',
            'allow_seller_own_drivers' => \App\Models\Setting::sellerOwnDriversAllowed(),
        ]);
    }

    public function list(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $limit = $request->limit ?? 10;
        $offset = $request->offset ?? 0;

        // Pending and rejected registration requests live on the Requests page, not in the fleet.
        $query = DeliveryBoy::where('seller_id', $seller->id)
            ->whereNotIn('status', [DeliveryBoy::$statusRegistered, DeliveryBoy::$statusRejected]);
        $total = (clone $query)->count();
        $deliveryBoys = $query->select('id', 'name', 'mobile', 'admin_id', 'status', 'is_online', 'city_id', 'custom_field_values', 'balance', 'bonus_type', 'bonus_percentage', 'bonus_min_amount', 'bonus_max_amount')
            ->with('admin:id,email')
            ->orderByDesc('id')
            ->skip($offset)
            ->take($limit)
            ->get();

        // email lives on the linked admin account, not on delivery_boys itself - same
        // pattern DeliveryBoysApiController::getDeliveryBoy uses for the admin list.
        $cityIdsByDriver = DB::table('delivery_boy_cities')
            ->whereIn('delivery_boy_id', $deliveryBoys->pluck('id'))
            ->get(['delivery_boy_id', 'city_id'])
            ->groupBy('delivery_boy_id');
        $deliveryBoys->each(function (DeliveryBoy $db) use ($cityIdsByDriver) {
            $db->email = $db->admin->email ?? '';
            $db->city_ids = ($cityIdsByDriver[$db->id] ?? collect())->pluck('city_id')->map(fn ($id) => (int) $id)->values();
        });

        return CommonHelper::responseWithData($deliveryBoys, $total);
    }

    /**
     * The seller's own cities - the only ones a driver of theirs may be assigned to.
     */
    public function cities()
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $cities = City::whereIn('id', $this->sellerCityIds($seller))->get()
            ->map(fn ($c) => ['id' => $c->id, 'name' => trim($c->name . (!empty($c->zone) ? ' - ' . $c->zone : ''))])
            ->values();

        return CommonHelper::responseWithData($cities);
    }

    /**
     * Validated city ids from the request, restricted to the seller's own cities.
     * Returns null when none are valid (caller rejects the request).
     */
    private function requestedCityIds(Request $request, $seller): ?array
    {
        $allowed = $this->sellerCityIds($seller);
        $ids = array_values(array_unique(array_map('intval', (array) $request->input('city_ids', []))));
        if (empty($ids) || array_diff($ids, $allowed)) {
            return null;
        }
        return $ids;
    }

    /**
     * Public list of active sellers (in active modules) for the delivery-boy registration "register to seller"
     * dropdown.
     */
    public function registrationSellers(Request $request)
    {
        $sellers = \App\Models\Seller::registrableForDeliveryBoy($request->has('city_ids') ? \App\Models\DeliveryBoy::cityIdsFromRequest($request) : $request->input('city_id'))
            ->orderBy('store_name')
            ->get(['id', 'name', 'store_name'])
            ->map(fn ($s) => ['id' => $s->id, 'name' => trim($s->store_name ?: $s->name)])
            ->values();

        // `data` stays a plain list; the switch value rides alongside it so the apps don't
        // need the admin-only module_delivery_settings call.
        $response = CommonHelper::responseWithData($sellers, $sellers->count());
        $body = $response->getData(true);
        $body['allow_seller_own_drivers'] = \App\Models\Setting::sellerOwnDriversAllowed();

        return $response->setData($body);
    }

    /**
     * Registration requests sent to this seller by delivery boys (status = registered),
     * or, with `status`, previously answered ones.
     */
    public function requests(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $limit = $request->limit ?? 10;
        $offset = $request->offset ?? 0;
        $status = $request->has('status') && $request->status !== ''
            ? (int) $request->status
            : DeliveryBoy::$statusRegistered;

        $query = DeliveryBoy::where('seller_id', $seller->id)->where('status', $status);
        $total = (clone $query)->count();
        $rows = $query->select('id', 'name', 'mobile', 'admin_id', 'status', 'city_id', 'dob', 'created_at')
            ->with('admin:id,email')
            ->orderByDesc('id')
            ->skip($offset)
            ->take($limit)
            ->get();

        $cities = City::whereIn('id', $rows->pluck('city_id')->filter())->get()->keyBy('id');
        $rows->each(function (DeliveryBoy $db) use ($cities) {
            $db->email = $db->admin->email ?? '';
            $city = $cities[$db->city_id] ?? null;
            $db->city_name = $city ? trim($city->name . (!empty($city->zone) ? ' - ' . $city->zone : '')) : '';
        });

        return CommonHelper::responseWithData($rows, $total);
    }

    /**
     * Accept or reject a registration request sent to this seller.
     */
    public function respondRequest(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:delivery_boys,id',
            'action' => 'required|in:accept,reject',
            'remark' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $deliveryBoy = DeliveryBoy::where('id', $request->id)
            ->where('seller_id', $seller->id)
            ->where('status', DeliveryBoy::$statusRegistered)
            ->first();
        if (!$deliveryBoy) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        $accept = $request->action === 'accept';
        DB::beginTransaction();
        try {
            $deliveryBoy->status = $accept ? DeliveryBoy::$statusActive : DeliveryBoy::$statusRejected;
            if (!$accept && $request->filled('remark')) {
                $deliveryBoy->remark = $request->remark;
            }
            $deliveryBoy->save();

            if ($accept && $deliveryBoy->city_id) {
                $deliveryBoy->cities()->syncWithoutDetaching([$deliveryBoy->city_id]);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Seller delivery boy request respond error', [$e->getMessage()]);
            return CommonHelper::responseError('something_went_wrong');
        }

        try {
            $email = $deliveryBoy->admin->email ?? null;
            if ($email) {
                CommonHelper::sendMailAdminStatus('delivery_boy', $deliveryBoy, $deliveryBoy->status, $email);
            }
        } catch (\Exception $e) {
            Log::error('Seller delivery boy request status mail error', [$e->getMessage()]);
        }

        return CommonHelper::responseSuccess($accept ? 'delivery_boy_request_accepted' : 'delivery_boy_request_rejected');
    }

    /**
     * Drivers a salary may be recorded for: this seller's own, accepted drivers only.
     */
    private function salaryDriverQuery($seller)
    {
        return DeliveryBoy::where('seller_id', $seller->id)
            ->whereNotIn('status', [DeliveryBoy::$statusRegistered, DeliveryBoy::$statusRejected]);
    }

    public function salaries(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $ownIds = DeliveryBoy::where('seller_id', $seller->id)->select('id');
        $query = DB::table('delivery_boy_salary as s')
            ->leftJoin('delivery_boys as d', 'd.id', '=', 's.delivery_boy_id')
            ->whereIn('s.delivery_boy_id', $ownIds)
            ->select('s.*', 'd.name as delivery_boy_name')
            ->orderByDesc('s.id');

        if ($request->filled('startDate')) {
            $query->whereDate('s.paid_on', '>=', $request->startDate);
        }
        if ($request->filled('endDate')) {
            $query->whereDate('s.paid_on', '<=', $request->endDate);
        }
        if ($request->filled('delivery_boy_id')) {
            $query->where('s.delivery_boy_id', $request->delivery_boy_id);
        }

        return CommonHelper::responseWithData([
            'salaries' => $query->get(),
            'deliveryBoys' => $this->salaryDriverQuery($seller)->select('id', 'name', 'mobile')->get(),
            'date_format' => CommonHelper::getDateFormat(),
        ]);
    }

    public function saveSalary(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $validator = Validator::make($request->all(), [
            'id' => 'nullable|exists:delivery_boy_salary,id',
            'delivery_boy_id' => 'required|exists:delivery_boys,id',
            'amount' => 'required|numeric|min:0',
            'paid_on' => 'required|date',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Own drivers only: the driver must belong to this seller (and be accepted).
        if (!$this->salaryDriverQuery($seller)->where('id', $request->delivery_boy_id)->exists()) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        $data = [
            'delivery_boy_id' => $request->delivery_boy_id,
            'amount' => $request->amount,
            'message' => $request->message ?? '',
            'paid_on' => $request->paid_on,
            'updated_at' => now(),
        ];

        try {
            if ($request->filled('id')) {
                // The existing row must also belong to one of this seller's drivers.
                $updated = DB::table('delivery_boy_salary')
                    ->where('id', $request->id)
                    ->whereIn('delivery_boy_id', DeliveryBoy::where('seller_id', $seller->id)->select('id'))
                    ->update($data);
                if (!$updated) {
                    return CommonHelper::responseError('salary_not_found');
                }
                return CommonHelper::responseSuccess('salary_updated_successfully');
            }

            DB::table('delivery_boy_salary')->insert($data + ['created_at' => now()]);
            return CommonHelper::responseSuccess('salary_added_successfully');
        } catch (\Exception $e) {
            Log::error('Seller salary save error', [$e->getMessage()]);
            return CommonHelper::responseError('something_went_wrong');
        }
    }

    public function deleteSalary(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }
        if (!$request->id) {
            return CommonHelper::responseError('id_required');
        }

        $deleted = DB::table('delivery_boy_salary')
            ->where('id', $request->id)
            ->whereIn('delivery_boy_id', DeliveryBoy::where('seller_id', $seller->id)->select('id'))
            ->delete();
        if (!$deleted) {
            return CommonHelper::responseError('salary_not_found');
        }

        return CommonHelper::responseSuccess('salary_deleted_successfully');
    }

    public function save(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        if (!$seller->usesOwnFleet()) {
            return CommonHelper::responseError('seller_owned_fleet_not_enabled_for_this_module');
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'mobile' => 'required',
            'email' => 'email|required|unique:admins,email',
            'password' => 'required',
            'city_ids' => 'required|array|min:1',
            'bonus_type' => 'required|in:0,1',
            'bonus_percentage' => $request->bonus_type == 1 ? 'required|numeric|min:0.1|max:100' : 'nullable',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $cityIds = $this->requestedCityIds($request, $seller);
        if ($cityIds === null) {
            return CommonHelper::responseError('please_select_your_own_cities_only');
        }

        DB::beginTransaction();
        try {
            $admin = Admin::create([
                'username' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role_id' => Role::$roleDeliveryBoy,
                'created_by' => auth()->id(),
            ]);

            // A seller's own driver serves one or more of the seller's own cities (picked in the
            // form, validated above). sellers.city_id is a comma-separated list while
            // delivery_boys.city_id is a single integer, so city_id keeps the first selected city
            // for older readers and the full set goes to delivery_boy_cities.
            // Note: delivery_boys has no email column - email lives on the linked admin
            // account only (same as the admin-created flow in DeliveryBoysApiController::save).
            $deliveryBoy = DeliveryBoy::create([
                'admin_id' => $admin->id,
                'seller_id' => $seller->id,
                'name' => $request->name,
                'mobile' => $request->mobile,
                'city_id' => $cityIds[0],
                'bonus_type' => $request->bonus_type ?? 0,
                'bonus_percentage' => $request->bonus_percentage ?? 0,
                'bonus_min_amount' => $request->bonus_min_amount ?? 0,
                'bonus_max_amount' => $request->bonus_max_amount ?? 0,
                'status' => DeliveryBoy::$statusActive,
            ]);

            $deliveryBoy->cities()->sync($cityIds);
            $deliveryBoy->saveTranslation($this->defaultLanguageId(), ['name' => $request->name]);
            $deliveryBoy->custom_field_values = $this->customFieldValues($request, $seller);
            $deliveryBoy->save();

            DB::commit();

            return CommonHelper::responseWithData([
                'id' => $deliveryBoy->id,
                'message' => __('delivery_boy_saved_successfully'),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Seller delivery boy save error', [$e->getMessage()]);
            return CommonHelper::responseError('something_went_wrong');
        }
    }

    public function update(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:delivery_boys,id',
            'name' => 'required',
            'mobile' => 'required',
            'bonus_type' => 'nullable|in:0,1',
            'bonus_percentage' => $request->bonus_type == 1 ? 'required|numeric|min:0.1|max:100' : 'nullable',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $deliveryBoy = DeliveryBoy::where('id', $request->id)->where('seller_id', $seller->id)->first();
        if (!$deliveryBoy) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        $deliveryBoy->name = $request->name;
        $deliveryBoy->mobile = $request->mobile;
        if ($request->has('bonus_type')) {
            $deliveryBoy->bonus_type = $request->bonus_type;
            $deliveryBoy->bonus_percentage = $request->bonus_percentage ?? 0;
            $deliveryBoy->bonus_min_amount = $request->bonus_min_amount ?? 0;
            $deliveryBoy->bonus_max_amount = $request->bonus_max_amount ?? 0;
        }
        // Cities are optional on update; when sent they must all be the seller's own.
        $cityIds = null;
        if ($request->has('city_ids')) {
            $cityIds = $this->requestedCityIds($request, $seller);
            if ($cityIds === null) {
                return CommonHelper::responseError('please_select_your_own_cities_only');
            }
            $deliveryBoy->city_id = $cityIds[0];
        }
        $deliveryBoy->custom_field_values = $this->customFieldValues($request, $seller, $deliveryBoy->custom_field_values ?? []);
        $deliveryBoy->save();
        if ($cityIds !== null) {
            $deliveryBoy->cities()->sync($cityIds);
        }
        $deliveryBoy->saveTranslation($this->defaultLanguageId(), ['name' => $request->name]);

        return CommonHelper::responseSuccess('delivery_boy_updated_successfully');
    }

    public function updateStatus(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:delivery_boys,id',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $deliveryBoy = DeliveryBoy::where('id', $request->id)->where('seller_id', $seller->id)->first();
        if (!$deliveryBoy) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        $deliveryBoy->status = $request->status;
        $deliveryBoy->save();

        return CommonHelper::responseSuccess('delivery_boy_status_updated_successfully');
    }

    public function delete(Request $request)
    {
        $seller = $this->currentSeller();
        if (!$seller) {
            return CommonHelper::responseError('seller_not_found');
        }

        $deliveryBoy = DeliveryBoy::where('id', $request->id)->where('seller_id', $seller->id)->first();
        if (!$deliveryBoy) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        if ($deliveryBoy->pending_order_count > 0) {
            return CommonHelper::responseError('cannot_delete_delivery_boy_with_active_orders');
        }

        $adminId = $deliveryBoy->admin_id;
        $deliveryBoy->delete();
        // Remove the driver's login too, otherwise their email stays "already taken".
        if ($adminId) {
            \App\Models\AdminToken::where('user_id', $adminId)->where('type', 'Delivery Boy')->delete();
            \App\Models\Admin::where('id', $adminId)->where('role_id', \App\Models\Role::$roleDeliveryBoy)->delete();
        }

        return CommonHelper::responseSuccess('delivery_boy_deleted_successfully');
    }

    /**
     * Merge submitted custom_field_values (JSON keyed by field id) into the driver's values,
     * restricted to this seller's own delivery_boy fields; stores uploads for 'file' fields.
     */
    private function customFieldValues(Request $request, $seller, array $existing = []): array
    {
        $fields = CustomField::withoutGlobalScope('module')
            ->where('module', 'delivery_boy')->where('seller_id', $seller->id)->get();
        $allowedIds = $fields->pluck('id')->all();

        $submitted = $request->input('custom_field_values');
        if (is_string($submitted)) {
            $submitted = json_decode($submitted, true);
        }
        $values = $existing;
        foreach ((array) $submitted as $id => $value) {
            if (in_array((int) $id, $allowedIds)) {
                $values[$id] = $value;
            }
        }

        foreach ($fields->where('type', 'file') as $field) {
            if ($request->hasFile('custom_field_file_' . $field->id)) {
                $values[$field->id] = Storage::disk('public')
                    ->putFile('delivery_boy/custom_fields', $request->file('custom_field_file_' . $field->id));
            }
        }

        return $values;
    }

    /**
     * City ids the seller operates in - sellers.city_id holds them as a comma-separated list.
     */
    private function sellerCityIds($seller): array
    {
        return array_values(array_filter(array_map('intval', explode(',', (string) $seller->city_id))));
    }

    private function defaultLanguageId(): int
    {
        return CommonHelper::getDefaultLanguageId();
    }
}
