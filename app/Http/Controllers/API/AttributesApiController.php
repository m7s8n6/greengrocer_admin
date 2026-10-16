<?php

namespace App\Http\Controllers\API;

use App\Services\LanguageService;
use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AttributesApiController extends Controller
{
    protected $languageService;

    public function __construct(LanguageService $languageService)
    {
        $this->languageService = $languageService;
    }

    /**
     * Ownership is resolved per-request from the authenticated user rather than the route,
     * same pattern AddonApiController uses: a seller only ever sees/edits their own attributes
     * (seller_id = their id) plus admin-created global ones (seller_id null); an admin sees/
     * edits everything.
     */
    private function currentSellerId()
    {
        $user = auth()->user();

        if (!$user || !$user->seller || !$user->role || $user->role->name !== 'Seller') {
            return null;
        }

        return $user->seller->id;
    }

    /**
     * Category ids the current seller is allowed to assign an attribute to - the same set
     * they're allowed to list products under (sellers.categories, comma-separated ids).
     */
    private function currentSellerCategoryIds()
    {
        $seller = auth()->user()->seller;
        if (!$seller || !$seller->categories) {
            return [];
        }

        return array_filter(array_map('intval', explode(',', $seller->categories)));
    }

    public function list(Request $request)
    {
        $sellerId = $this->currentSellerId();

        if ($request->filled('id')) {
            $query = Attribute::withAllTranslations()->with('values', 'categories:id,name');
            if ($sellerId) {
                $query->where(function ($q) use ($sellerId) {
                    $q->where('seller_id', $sellerId)->orWhereNull('seller_id');
                });
            }
            $attribute = $query->where('id', $request->id)->first();

            if (!$attribute) {
                return CommonHelper::responseError('attribute_not_found');
            }

            return CommonHelper::responseWithData($attribute);
        }

        $limit = $request->input('per_page', 10);
        $page = max((int) $request->input('page', 1), 1);
        $offset = ($page - 1) * $limit;
        $filter = $request->input('filter', '');

        $query = Attribute::withAllTranslations()
            ->with('values', 'seller:id,name,store_name,email', 'categories:id,name')
            ->withCount(['categories', 'values as variants_count' => function ($q) {
                $q->join('product_variants', 'product_variants.attribute_value_id', '=', 'attribute_values.id');
            }])
            ->orderBy('id', 'DESC');

        if ($sellerId) {
            $query->where(function ($q) use ($sellerId) {
                $q->where('seller_id', $sellerId)->orWhereNull('seller_id');
            });
        }

        if ($filter) {
            $query->where(function ($q) use ($filter) {
                $q->where('id', 'like', "%{$filter}%")
                  ->orWhere('name', 'like', "%{$filter}%");

                $lowerFilter = strtolower($filter);
                if (str_contains($lowerFilter, 'deac') || str_contains($lowerFilter, 'inac') || $filter === '0') {
                    $q->orWhere('status', 0);
                } elseif (str_contains($lowerFilter, 'act') || $filter === '1') {
                    $q->orWhere('status', 1);
                }
            });
        }

        $total = $query->count();
        $attributes = $query->skip($offset)->take($limit)->get();

        $attributes->each(function ($attribute) use ($sellerId) {
            $attribute->is_mine = $sellerId && $attribute->seller_id == $sellerId;
            // Seller's own $appends (categories_array, tax_name/number, pan_number, id proof
            // urls, translations) each run their own un-batched query - categories_array alone
            // cascades into every category's has_child/has_active_child/translations. This list
            // only ever displays seller id/name/store_name/email, so hide the rest before
            // serialization skips calling those accessors at all instead of just discarding them.
            if ($attribute->seller) {
                $attribute->seller->makeHidden([
                    'logo_url', 'national_identity_card_url', 'address_proof_url',
                    'tax_name', 'tax_number', 'pan_number', 'categories_array',
                    'pickup_store_timings_array', 'translations',
                ]);
            }

            
            foreach ($attribute->categories as $category) {
                $category->makeHidden(['has_child', 'has_active_child', 'translations', 'image_url']);
            }
        });

        return CommonHelper::responseWithData($attributes, $total);
    }

    public function save(Request $request)
    {
        $defaultLanguage = $this->languageService->getDefaultLanguage();

        $validator = Validator::make($request->all(), [
            'translations' => 'required|array',
            "translations.{$defaultLanguage->id}.name" => 'required|string',
            'type' => 'nullable|in:' . implode(',', Attribute::$types),
            'values' => 'required|array|min:1',
            'values.*.value' => 'required|string',
            'values.*.short_code' => 'nullable|required_if:type,text|string',
            'values.*.color_code' => 'nullable|string',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'integer',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $sellerId = $this->currentSellerId();

        // A seller may only attach their attribute to categories they're already allowed to
        // sell under - never to a category outside their assigned list.
        $categoryIds = $request->input('category_ids', []);
        if ($sellerId) {
            $categoryIds = array_values(array_intersect($categoryIds, $this->currentSellerCategoryIds()));
        }

        $moduleId = request()->header('X-Module-Id') ?: 1;

        $attributeId = DB::transaction(function () use ($request, $defaultLanguage, $moduleId, $sellerId, $categoryIds) {
            $attribute = new Attribute();
            $attribute->module_id = $moduleId;
            $attribute->seller_id = $sellerId;
            $attribute->name = $request->translations[$defaultLanguage->id]['name'];
            $attribute->type = $request->type ?? 'text';
            $attribute->status = $request->status ?? 1;
            $attribute->save();

            foreach ($request->translations as $languageId => $data) {
                $attribute->saveTranslation((int) $languageId, [
                    'name' => $data['name'] ?? '',
                ]);
            }

            foreach ($request->values as $index => $valueData) {
                $this->saveValue($attribute, null, $valueData, $index, $request);
            }

            if ($categoryIds) {
                $attribute->categories()->sync($categoryIds);
            }

            return $attribute->id;
        });

        return CommonHelper::responseWithData([
            'id' => $attributeId,
            'message' => __('attribute_saved_successfully'),
        ]);
    }

    public function update(Request $request)
    {
        $defaultLanguage = $this->languageService->getDefaultLanguage();

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:attributes,id',
            'translations' => 'required|array',
            "translations.{$defaultLanguage->id}.name" => 'required|string',
            'type' => 'nullable|in:' . implode(',', Attribute::$types),
            'values' => 'required|array|min:1',
            'values.*.value' => 'required|string',
            'values.*.short_code' => 'nullable|required_if:type,text|string',
            'values.*.color_code' => 'nullable|string',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'integer',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $attribute = Attribute::find($request->id);
        if (!$attribute) {
            return CommonHelper::responseError('attribute_not_found');
        }

        $sellerId = $this->currentSellerId();
        if ($sellerId && $attribute->seller_id !== $sellerId) {
            return CommonHelper::responseError('not_authorized');
        }

        // category_ids is only touched when the form actually submitted it - an admin editing
        // an attribute (no category picker in this form) must never wipe its category links.
        $categoryIds = $request->boolean('category_ids_provided') ? $request->input('category_ids', []) : null;
        if ($categoryIds !== null && $sellerId) {
            $categoryIds = array_values(array_intersect($categoryIds, $this->currentSellerCategoryIds()));
        }

        $keptValueNames = [];

        DB::transaction(function () use ($request, $attribute, $defaultLanguage, $categoryIds, &$keptValueNames) {
            $attribute->name = $request->translations[$defaultLanguage->id]['name'];
            $attribute->type = $request->type ?? $attribute->type;
            $attribute->status = $request->status ?? $attribute->status;
            $attribute->save();

            foreach ($request->translations as $languageId => $data) {
                $attribute->saveTranslation((int) $languageId, [
                    'name' => $data['name'] ?? '',
                ]);
            }

            /* Remove values deleted in the UI. A value backing a product variant must stay:
               the product_variants FK is RESTRICT, so deleting it would throw a raw SQL error.
               Values the admin tried to remove but that got kept are reported back below, so
               the UI can tell them why the value is still there instead of leaving them to
               notice it reappeared after a reload. */
            $incomingIds = collect($request->values)->pluck('id')->filter()->all();
            $keptValueNames = $attribute->values()
                ->whereNotIn('id', $incomingIds ?: [0])
                ->whereHas('variants')
                ->pluck('value')
                ->all();

            $attribute->values()
                ->whereNotIn('id', $incomingIds ?: [0])
                ->whereDoesntHave('variants')
                ->delete();

            foreach ($request->values as $index => $valueData) {
                $existing = !empty($valueData['id'])
                    ? $attribute->values()->find($valueData['id'])
                    : null;
                $this->saveValue($attribute, $existing, $valueData, $index, $request);
            }

            if ($categoryIds !== null) {
                $attribute->categories()->sync($categoryIds);
            }
        });

        if (count($keptValueNames)) {
            return CommonHelper::responseSuccessWithData('attribute_updated_successfully', [
                'kept_values' => $keptValueNames,
            ]);
        }

        return CommonHelper::responseSuccess('attribute_updated_successfully');
    }

    public function delete(Request $request)
    {
        $attribute = Attribute::find($request->id);

        if (!$attribute) {
            return CommonHelper::responseError('attribute_not_found');
        }

        /* Deleting an attribute is admin-only, EXCEPT a seller may delete an attribute they
           created themselves (seller_id = their id) - and only while it's not attached to any
           category yet. Once it's assigned to a category it's treated like any shared resource
           and only admin can remove it. A global (admin-owned, seller_id null) attribute can
           never be deleted by a seller regardless of category use. */
        $sellerId = $this->currentSellerId();
        if ($sellerId) {
            if ($attribute->seller_id !== $sellerId) {
                return CommonHelper::responseError('not_authorized');
            }
            if ($attribute->categories()->count() > 0) {
                return CommonHelper::responseError('attribute_in_use_cannot_be_deleted');
            }
        }

        /* The only case that can't be overridden: a live product variant's own row references
           this attribute's values (FK restrict) - deleting would fail at the DB level anyway. */
        $variantCount = ProductVariant::whereIn(
            'attribute_value_id',
            $attribute->values()->select('id')
        )->count();

        if ($variantCount > 0) {
            return CommonHelper::responseError(
                __('attribute_used_by_products_cannot_be_deleted') . ' (' . $variantCount . ')'
            );
        }

        $attribute->categories()->detach();
        $attribute->delete();

        return CommonHelper::responseSuccess('attribute_deleted_successfully');
    }

    /**
     * Create or update a single attribute value row. color_code/image are only meaningful
     * when the parent attribute's type is 'color'/'image' - harmless to store either way.
     */
    private function saveValue(Attribute $attribute, ?AttributeValue $value, array $valueData, int $index, Request $request)
    {
        if (!$value) {
            $value = new AttributeValue();
            $value->attribute_id = $attribute->id;
        }

        $value->value = $valueData['value'];
        $value->short_code = $valueData['short_code'] ?? null;
        $value->color_code = $valueData['color_code'] ?? null;
        $value->sequence = $valueData['sequence'] ?? $index;

        $imageFile = $request->file("values.{$index}.image");
        if ($imageFile) {
            $value->image = $imageFile->store('attribute_values', 'public');
        }

        $value->save();

        return $value;
    }

    /**
     * All active attributes with their values - feeds the category form and product variant matrix.
     */
    public function getAttributes(Request $request)
    {
        $sellerId = $this->currentSellerId();

        $query = Attribute::withAllTranslations()
            ->with('values')
            ->where('status', 1)
            ->orderBy('id', 'DESC');

        if ($sellerId) {
            $query->where(function ($q) use ($sellerId) {
                $q->where('seller_id', $sellerId)->orWhereNull('seller_id');
            });
        }

        if ($request->filled('category_id')) {
            $categoryId = $request->input('category_id');
            $query->whereHas('categories', function ($q) use ($categoryId) {
                $q->where('categories.id', $categoryId);
            });
        }

        $attributes = $query->get();

        return CommonHelper::responseWithData($attributes, $attributes->count());
    }
}
