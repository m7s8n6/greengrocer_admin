<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\CustomField;
use App\Services\LanguageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CustomFieldApiController extends Controller
{
    protected $languageService;

    public function __construct(LanguageService $languageService)
    {
        $this->languageService = $languageService;
    }

    private function currentSellerId()
    {
        
        $user = auth('api')->user();

        if (!$user || !$user->seller || !$user->role || $user->role->name !== 'Seller') {
            return null;
        }

        return $user->seller->id;
    }

    public function getDateFormat()
    {
        return CommonHelper::responseWithData(CommonHelper::getDateFormat());
    }

    public function getCustomFields(Request $request)
    {
        $module = $request->get('module');
        $sellerId = $this->currentSellerId();

        $query = CustomField::withAllTranslations();

        if (in_array($module, ['customer', 'delivery_boy'])) {
            $query->withoutGlobalScope('module');
        }

        if (!empty($module)) {
            $query->where('module', $module);
        }

        // Seller-created delivery_boy fields (seller_id set) apply only to that seller's own fleet;
        // admin/public forms see only the global ones (seller_id null).
        if ($module === 'delivery_boy') {
            $sellerId ? $query->where('seller_id', $sellerId) : $query->whereNull('seller_id');
        }

        if ($module === 'product') {
            $query->with('seller:id,name');

            if ($sellerId) {
                $query->where(function ($q) use ($sellerId) {
                    $q->where('seller_id', $sellerId)->orWhereNull('seller_id');
                });
            }
        }

        if ($request->boolean('active_only')) {
            $query->where('status', 1);
        }

        if ($filter = $request->get('filter')) {
            $query->where('name', 'like', "%{$filter}%");
        }

        $query->orderBy('sort_order', 'ASC')->orderBy('id', 'ASC');

        $total = $query->count();

        if ($request->filled('per_page')) {
            $limit = (int) $request->get('per_page', 10);
            $page = max((int) $request->get('page', 1), 1);
            $query->skip(($page - 1) * $limit)->take($limit);
        }

        $customFields = $query->get();

        if (in_array($module, ['product', 'delivery_boy'])) {
            $customFields->each(function ($field) use ($sellerId) {
                $field->is_mine = $sellerId && $field->seller_id == $sellerId;
            });
        }

        return CommonHelper::responseWithData($customFields, $total);
    }

    public function save(Request $request)
    {
        $defaultLanguage = $this->languageService->getDefaultLanguage();

        $validator = Validator::make($request->all(), [
            'module' => 'required|in:seller,delivery_boy,customer,product',
            'translations' => 'required|array',
            "translations.{$defaultLanguage->id}.name" => 'required|string',
            'type' => 'required|in:text,number,dropdown,file,textarea,date',
            "translations.{$defaultLanguage->id}.options" => 'required_if:type,dropdown',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $sellerId = $this->currentSellerId();
        if ($sellerId && !in_array($request->module, ['product', 'delivery_boy'])) {
            return CommonHelper::responseError('not_authorized');
        }

        $defaultData = $request->translations[$defaultLanguage->id];

        $customField = DB::transaction(function () use ($request, $defaultLanguage, $defaultData, $sellerId) {
            $customField = new CustomField();
            $customField->module = $request->module;
            $customField->seller_id = $sellerId;
            if (in_array($request->module, ['customer', 'delivery_boy'])) {
                $customField->module_id = 1;
            }
            $customField->name = $defaultData['name'];
            $customField->type = $request->type;
            $customField->options = $this->parseOptions($request->type, $defaultData['options'] ?? null);
            $customField->is_required = $request->boolean('is_required');
            $customField->status = $request->has('status') ? $request->boolean('status') : true;
            $customField->sort_order = $request->sort_order ?? 0;
            $customField->save();

            foreach ($request->translations as $languageId => $data) {
                $customField->saveTranslation((int) $languageId, [
                    'name' => $data['name'] ?? '',
                    'options' => $this->parseOptions($request->type, $data['options'] ?? null),
                ]);
            }

            return $customField;
        });

        return CommonHelper::responseSuccessWithData('custom_field_saved_successfully', $customField);
    }

    public function update(Request $request)
    {
        $defaultLanguage = $this->languageService->getDefaultLanguage();

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:custom_fields,id',
            'module' => 'required|in:seller,delivery_boy,customer,product',
            'translations' => 'required|array',
            "translations.{$defaultLanguage->id}.name" => 'required|string',
            'type' => 'required|in:text,number,dropdown,file,textarea,date',
            "translations.{$defaultLanguage->id}.options" => 'required_if:type,dropdown',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $customField = CustomField::withoutGlobalScope('module')->find($request->id);
        if (!$customField) {
            return CommonHelper::responseError('custom_field_not_found');
        }

        $sellerId = $this->currentSellerId();
        if ($sellerId && $customField->seller_id !== $sellerId) {
            return CommonHelper::responseError('not_authorized');
        }

        $defaultData = $request->translations[$defaultLanguage->id];

        DB::transaction(function () use ($request, $customField, $defaultData) {
            $customField->module = $request->module;
            if (in_array($request->module, ['customer', 'delivery_boy'])) {
                $customField->module_id = 1;
            }
            $customField->name = $defaultData['name'];
            $customField->type = $request->type;
            $customField->options = $this->parseOptions($request->type, $defaultData['options'] ?? null);
            $customField->is_required = $request->boolean('is_required');
            if ($request->has('status')) {
                $customField->status = $request->boolean('status');
            }
            $customField->sort_order = $request->sort_order ?? $customField->sort_order;
            $customField->save();

            foreach ($request->translations as $languageId => $data) {
                $customField->saveTranslation((int) $languageId, [
                    'name' => $data['name'] ?? '',
                    'options' => $this->parseOptions($request->type, $data['options'] ?? null),
                ]);
            }
        });

        return CommonHelper::responseSuccessWithData('custom_field_updated_successfully', $customField);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:custom_fields,id',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $customField = CustomField::withoutGlobalScope('module')->find($request->id);
        if (!$customField) {
            return CommonHelper::responseError('custom_field_not_found');
        }

        $sellerId = $this->currentSellerId();
        if ($sellerId && $customField->seller_id !== $sellerId) {
            return CommonHelper::responseError('not_authorized');
        }

        $customField->delete();

        return CommonHelper::responseSuccess('custom_field_deleted_successfully');
    }

    public function updateStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:custom_fields,id',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $customField = CustomField::withoutGlobalScope('module')->find($request->id);
        if (!$customField) {
            return CommonHelper::responseError('custom_field_not_found');
        }

        $sellerId = $this->currentSellerId();
        if ($sellerId && $customField->seller_id !== $sellerId) {
            return CommonHelper::responseError('not_authorized');
        }

        $customField->status = (int) $request->status;
        $customField->save();

        return CommonHelper::responseSuccess('custom_field_status_updated_successfully');
    }

    /**
     * Normalize dropdown options into an array. Accepts a JSON array string, or a
     * comma/newline separated plain string coming from the admin panel textarea.
     */
    private function parseOptions($type, $options)
    {
        if ($type !== 'dropdown') {
            return null;
        }

        if (empty($options)) {
            return [];
        }

        if (is_array($options)) {
            return array_values(array_filter(array_map('trim', $options), fn ($v) => $v !== ''));
        }

        $decoded = json_decode($options, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            return array_values(array_filter(array_map('trim', $decoded), fn ($v) => $v !== ''));
        }

        $parts = preg_split('/[\r\n,]+/', (string) $options);

        return array_values(array_filter(array_map('trim', $parts), fn ($v) => $v !== ''));
    }
}
