<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\AddonGroup;
use App\Services\LanguageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

/**
 * Addon groups/options CRUD - shared by both the admin and seller route groups (same pattern
 * BrandsApiController already uses). Ownership is resolved per-request from the authenticated
 * user rather than the route: a seller only ever sees/edits their own groups (seller_id = their
 * id) plus admin-created global ones (seller_id null); an admin sees/edits everything.
 */
class AddonApiController extends Controller
{
    protected $languageService;

    public function __construct(LanguageService $languageService)
    {
        $this->languageService = $languageService;
    }

    private function currentSellerId()
    {
        $user = auth()->user();

        // Having a `seller` relation isn't enough - an admin account can also own a seller
        // record (admin_id on sellers) for their own store, but that doesn't make them a
        // seller for permission-scoping purposes. Only the Seller role should be scoped.
        if (!$user || !$user->seller || !$user->role || $user->role->name !== 'Seller') {
            return null;
        }

        return $user->seller->id;
    }

    /**
     * Addons only make sense for the Food Delivery module. The UI already hides the menu/route
     * for sellers in any other module, but that's client-side only - block writes here too so a
     * direct API call can't create/edit/delete addons for a Grocery/Pharmacy/Ecommerce seller.
     */
    private function currentSellerModuleId()
    {
        $user = auth()->user();
        return $user && $user->seller ? $user->seller->module_id : null;
    }

    public function list(Request $request)
    {
        $sellerId = $this->currentSellerId();

        if ($request->filled('id')) {
            $query = AddonGroup::withAllTranslations()->with('options.translations');
            if ($sellerId) {
                $query->where(function ($q) use ($sellerId) {
                    $q->where('seller_id', $sellerId)->orWhereNull('seller_id');
                });
            }
            $group = $query->where('id', $request->id)->first();

            if (!$group) {
                return CommonHelper::responseError('addon_group_not_found');
            }

            return CommonHelper::responseWithData($group);
        }

        $limit = $request->input('per_page', 10);
        $page = max((int) $request->input('page', 1), 1);
        $offset = ($page - 1) * $limit;
        $filter = $request->input('filter', '');

        $query = AddonGroup::withAllTranslations()
            ->with('options.translations', 'seller:id,name,store_name,email')
            ->withCount(['options', 'products'])
            ->orderBy('id', 'DESC');

        if ($sellerId) {
            $query->where(function ($q) use ($sellerId) {
                $q->where('seller_id', $sellerId)->orWhereNull('seller_id');
            });
        }

        if ($filter) {
            $query->where('name', 'like', "%{$filter}%");
        }

        if ($request->filled('type') && in_array($request->input('type'), ['free', 'paid'], true)) {
            $query->where('type', $request->input('type'));
        }

        $total = $query->count();
        $groups = $query->skip($offset)->take($limit)->get();

        $groups->each(function ($group) use ($sellerId) {
            $group->is_mine = $sellerId && $group->seller_id == $sellerId;
            // Seller's own $appends (categories_array, tax_name/number, pan_number, id proof
            // urls, translations) each run their own un-batched query - categories_array alone
            // cascades into every category's has_child/has_active_child/translations. This list
            // only ever displays seller id/name/store_name/email, so hide the rest before
            // serialization skips calling those accessors at all instead of just discarding them.
            if ($group->seller) {
                $group->seller->makeHidden([
                    'logo_url', 'national_identity_card_url', 'address_proof_url',
                    'tax_name', 'tax_number', 'pan_number', 'categories_array',
                    'pickup_store_timings_array', 'translations',
                ]);
            }
        });

        return CommonHelper::responseWithData($groups, $total);
    }

    public function save(Request $request)
    {
        $defaultLanguage = $this->languageService->getDefaultLanguage();

        $validator = Validator::make($request->all(), [
            'translations' => 'required|array',
            "translations.{$defaultLanguage->id}.name" => 'required|string|max:255',
            'translations.*.sub_title' => 'nullable|string|max:255',
            'type' => 'required|in:free,paid',
            'selection_type' => 'required|in:single,multiple',
            'is_required' => 'nullable|boolean',
            'max_select' => 'nullable|integer|min:0',
            'options' => 'required|array|min:1',
            "options.*.translations.{$defaultLanguage->id}.name" => 'required|string|max:255',
            'options.*.price' => 'required|numeric|min:0',
            'options.*.discounted_price' => 'nullable|numeric|min:0|lte:options.*.price',
        ], [
            'options.*.discounted_price.lte' => __('discounted_price_cannot_be_higher_than_price'),
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Addons are seller-owned only now - admin no longer creates global ones. Existing
        // global (seller_id null) groups created before this change keep working as-is.
        $sellerId = $this->currentSellerId();
        if (!$sellerId) {
            return CommonHelper::responseError('only_sellers_can_create_addons');
        }
        if ($this->currentSellerModuleId() != 4) {
            return CommonHelper::responseError('addons_only_available_for_food_delivery_module');
        }

        $moduleId = $request->header('X-Module-Id') ?: 1;

        $group = DB::transaction(function () use ($request, $moduleId, $sellerId, $defaultLanguage) {
            $group = AddonGroup::create([
                'module_id' => $moduleId,
                'seller_id' => $sellerId,
                'name' => $request->translations[$defaultLanguage->id]['name'],
                'sub_title' => $request->translations[$defaultLanguage->id]['sub_title'] ?? null,
                'type' => $request->type,
                'selection_type' => $request->selection_type,
                'is_required' => $request->boolean('is_required'),
                'max_select' => $request->input('max_select', 0),
                'status' => 1,
            ]);

            foreach ($request->translations as $languageId => $data) {
                $group->saveTranslation((int) $languageId, [
                    'name' => $data['name'] ?? '',
                    'sub_title' => $data['sub_title'] ?? '',
                ]);
            }

            // A "Free" group has no priced options - even if the client sent a price, force it
            // to 0/null server-side so a paid option can never sneak into a free section.
            foreach ($request->input('options') as $index => $option) {
                $optionTranslations = $option['translations'] ?? [];

                $newOption = $group->options()->create([
                    'name' => $optionTranslations[$defaultLanguage->id]['name'] ?? '',
                    'price' => $request->type === 'paid' ? $option['price'] : 0,
                    'discounted_price' => $request->type === 'paid' ? ($option['discounted_price'] ?? null) : null,
                    'status' => 1,
                    'row_order' => $index,
                ]);

                foreach ($optionTranslations as $languageId => $data) {
                    $newOption->saveTranslation((int) $languageId, [
                        'name' => $data['name'] ?? '',
                    ]);
                }
            }

            return $group;
        });

        return CommonHelper::responseWithData([
            'id' => $group->id,
            'message' => __('addon_group_saved_successfully'),
        ]);
    }

    public function update(Request $request)
    {
        $defaultLanguage = $this->languageService->getDefaultLanguage();

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:addon_groups,id',
            'translations' => 'required|array',
            "translations.{$defaultLanguage->id}.name" => 'required|string|max:255',
            'translations.*.sub_title' => 'nullable|string|max:255',
            'type' => 'required|in:free,paid',
            'selection_type' => 'required|in:single,multiple',
            'is_required' => 'nullable|boolean',
            'max_select' => 'nullable|integer|min:0',
            'status' => 'nullable|boolean',
            'options' => 'required|array|min:1',
            'options.*.id' => 'nullable|integer|exists:addon_options,id',
            "options.*.translations.{$defaultLanguage->id}.name" => 'required|string|max:255',
            'options.*.price' => 'required|numeric|min:0',
            'options.*.discounted_price' => 'nullable|numeric|min:0|lte:options.*.price',
        ], [
            'options.*.discounted_price.lte' => __('discounted_price_cannot_be_higher_than_price'),
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $group = AddonGroup::find($request->id);
        if (!$group) {
            return CommonHelper::responseError('addon_group_not_found');
        }

        // Editing is seller-only, own groups only - admin can view/delete but never edit
        // (matches the delete warning flow: admin removes, doesn't alter, a seller's addon).
        $sellerId = $this->currentSellerId();
        if (!$sellerId || $group->seller_id !== $sellerId) {
            return CommonHelper::responseError('not_authorized');
        }
        if ($this->currentSellerModuleId() != 4) {
            return CommonHelper::responseError('addons_only_available_for_food_delivery_module');
        }

        DB::transaction(function () use ($request, $group, $defaultLanguage) {
            $group->update([
                'name' => $request->translations[$defaultLanguage->id]['name'],
                'sub_title' => $request->translations[$defaultLanguage->id]['sub_title'] ?? null,
                'type' => $request->type,
                'selection_type' => $request->selection_type,
                'is_required' => $request->boolean('is_required'),
                'max_select' => $request->input('max_select', 0),
                'status' => $request->input('status', $group->status),
            ]);

            foreach ($request->translations as $languageId => $data) {
                $group->saveTranslation((int) $languageId, [
                    'name' => $data['name'] ?? '',
                    'sub_title' => $data['sub_title'] ?? '',
                ]);
            }

            $isPaid = $request->type === 'paid';

            $keepIds = [];
            foreach ($request->input('options') as $index => $option) {
                $optionTranslations = $option['translations'] ?? [];
                $defaultName = $optionTranslations[$defaultLanguage->id]['name'] ?? '';

                if (!empty($option['id'])) {
                    $existing = $group->options()->where('id', $option['id'])->first();
                    if ($existing) {
                        $existing->update([
                            'name' => $defaultName,
                            'price' => $isPaid ? $option['price'] : 0,
                            'discounted_price' => $isPaid ? ($option['discounted_price'] ?? null) : null,
                            'row_order' => $index,
                        ]);
                        foreach ($optionTranslations as $languageId => $data) {
                            $existing->saveTranslation((int) $languageId, [
                                'name' => $data['name'] ?? '',
                            ]);
                        }
                        $keepIds[] = $existing->id;
                        continue;
                    }
                }

                $new = $group->options()->create([
                    'name' => $defaultName,
                    'price' => $isPaid ? $option['price'] : 0,
                    'discounted_price' => $isPaid ? ($option['discounted_price'] ?? null) : null,
                    'status' => 1,
                    'row_order' => $index,
                ]);
                foreach ($optionTranslations as $languageId => $data) {
                    $new->saveTranslation((int) $languageId, [
                        'name' => $data['name'] ?? '',
                    ]);
                }
                $keepIds[] = $new->id;
            }

            $group->options()->whereNotIn('id', $keepIds)->delete();
        });

        return CommonHelper::responseSuccess('addon_group_updated_successfully');
    }

    public function delete(Request $request)
    {
        $group = AddonGroup::find($request->id);
        if (!$group) {
            return CommonHelper::responseError('addon_group_not_found');
        }

        $sellerId = $this->currentSellerId();
        if ($sellerId && $group->seller_id !== $sellerId) {
            return CommonHelper::responseError('not_authorized');
        }
        if ($sellerId && $this->currentSellerModuleId() != 4) {
            return CommonHelper::responseError('addons_only_available_for_food_delivery_module');
        }

        $group->delete();

        return CommonHelper::responseSuccess('addon_group_deleted_successfully');
    }
}
