<?php

namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Http\Repository\CategoryRepository;
use App\Models\Category;
use App\Models\Offer;
use App\Models\Product;
use App\Models\Seller;
use App\Models\Slider;
use App\Models\Brand;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ShopApiController extends Controller
{

    public $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getShopData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
        ], [
            'latitude.required' => 'The latitude field is required.',
            'longitude.required' => 'The longitude field is required.'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user_id = $request->user('api-customers') ? $request->user('api-customers')->id : 0;
        $moduleId = request()->header('X-Module-Id') ?: 1;

        $cacheKey = 'shop_data_' . $moduleId . '_' . $user_id . '_' . round($request->latitude, 3) . '_' . round($request->longitude, 3);

        $output = Cache::remember($cacheKey, 120, function () use ($request, $user_id, $moduleId) {
            // Cache plain arrays, not Eloquent model trees - unserializing full models (with their
            // casts/relations/booted logic) on every cache hit is itself slow, defeating the cache.
            return json_decode(json_encode($this->buildShopData($request, $user_id, $moduleId)), true);
        });

        return CommonHelper::responseWithData($output);
    }

    private function buildShopData(Request $request, $user_id, $moduleId)
    {
        $seller_ids = CommonHelper::getSellerIds($request->latitude, $request->longitude);

        $sections = CommonHelper::getSectionWithProduct($seller_ids, $user_id, $moduleId);

        $categoryMode = \App\Models\Setting::get_value('category_background_color_mode') ?: 'global';
        $brandMode = \App\Models\Setting::get_value('brand_background_color_mode') ?: 'global';
        $countryMode = \App\Models\Setting::get_value('country_background_color_mode') ?: 'global';

        $sliders = Slider::where('status', 1)->where('module_id', $moduleId)->orderBy('id', 'DESC')->get();
        $sliders = $sliders->makeHidden(['image', 'product', 'category', 'created_at', 'updated_at', 'status']);

        foreach ($sliders as $key => $slider) {
            $slider->slider_url = $slider->slider_url ?? "";
            $slider->type_id = $slider->type_id ? intval($slider->type_id) : 0;

            if ($slider->type == 'category') {
                $slider->type_slug = Category::where('id', $slider->type_id)->value('slug') ?? "";

                $category = Category::find($slider->type_id);

                if ($category) {
                    // Hide meta_title from main category
                    $category->makeHidden(['meta_title', 'meta_keywords', 'schema_markup', 'meta_description', 'catActiveChilds', 'cat_active_childs', 'has_child', 'has_active_child']);
                    
                    $category->makeVisible(['background_color_for_light_theme', 'background_color_for_dark_theme']);
                    if ($category->background_color_for_light_theme === 'transparent') {
                        $category->background_color_for_light_theme = '#00000000';
                    }
                    if ($category->background_color_for_dark_theme === 'transparent') {
                        $category->background_color_for_dark_theme = '#00000000';
                    }
                }

                $slider->category_data = $category ?? (object)[];
            } elseif ($slider->type == 'product') {
                $slider->type_slug = Product::where('id', $slider->type_id)->value('slug') ?? "";
            } else {
                $slider->type_slug = "";
            }
        }

        $offers = Offer::where('module_id', $moduleId)->orderBy('id', 'DESC')->get();
        $offers = $offers->makeHidden(['image']);
        foreach($offers as $offer) {
             if($offer->category){
                  $offer->category->makeHidden(['catActiveChilds', 'cat_active_childs', 'has_child', 'has_active_child']);
                  $offer->category->makeVisible(['background_color_for_light_theme', 'background_color_for_dark_theme']);
                  if ($offer->category->background_color_for_light_theme === 'transparent') {
                      $offer->category->background_color_for_light_theme = '#00000000';
                  }
                  if ($offer->category->background_color_for_dark_theme === 'transparent') {
                      $offer->category->background_color_for_dark_theme = '#00000000';
                  }
             }
        }
        $is_category_section_in_homepage = CommonHelper::getIsCategorySectionInHomepage();
        $is_brand_section_in_homepage = CommonHelper::getIsBrandSectionInHomepage();
        $is_seller_section_in_homepage = CommonHelper::getIsSellerSectionInHomepage()['is_seller_section_in_homepage'];
        $is_country_section_in_homepage = CommonHelper::getIsCountrySectionInHomepage()['is_country_section_in_homepage'];
        $output = array(
            'sliders' => $sliders,
            'offers' => $offers,
            'sections' => $sections,
            'is_category_section_in_homepage' => $is_category_section_in_homepage,
            'is_brand_section_in_homepage' => $is_brand_section_in_homepage,
            'is_seller_section_in_homepage' => $is_seller_section_in_homepage,
            'is_country_section_in_homepage' => $is_country_section_in_homepage,
        );

        $output['category_background_color_mode'] = $categoryMode;
        $output['brand_background_color_mode'] = $brandMode;
        $output['country_background_color_mode'] = $countryMode;

        if ($categoryMode === 'global') {
            $catLight = \App\Models\Setting::get_value('category_background_color_light_theme') ?? '';
            $catDark = \App\Models\Setting::get_value('category_background_color_dark_theme') ?? '';
            $output['category_background_color_light_theme'] = $catLight === 'transparent' ? '#00000000' : $catLight;
            $output['category_background_color_dark_theme'] = $catDark === 'transparent' ? '#00000000' : $catDark;
        }

        if ($brandMode === 'global') {
            $brandLight = \App\Models\Setting::get_value('brand_background_color_light_theme') ?? '';
            $brandDark = \App\Models\Setting::get_value('brand_background_color_dark_theme') ?? '';
            $output['brand_background_color_light_theme'] = $brandLight === 'transparent' ? '#00000000' : $brandLight;
            $output['brand_background_color_dark_theme'] = $brandDark === 'transparent' ? '#00000000' : $brandDark;
        }

        if ($countryMode === 'global') {
            $countryLight = \App\Models\Setting::get_value('country_background_color_light_theme') ?? '';
            $countryDark = \App\Models\Setting::get_value('country_background_color_dark_theme') ?? '';
            $output['country_background_color_light_theme'] = $countryLight === 'transparent' ? '#00000000' : $countryLight;
            $output['country_background_color_dark_theme'] = $countryDark === 'transparent' ? '#00000000' : $countryDark;
        }

        if ($is_category_section_in_homepage && $is_category_section_in_homepage == 1) {
            $count_category_section_in_homepage = CommonHelper::getCountCategorySectionInHomepage();
            $categories = Category::where('status', 1)
                ->where('parent_id', 0)
                ->where('module_id', $moduleId)
                  ->where('status', 1)
                ->orderBy('row_order', 'ASC')
                ->limit($count_category_section_in_homepage)
                ->get(['id', 'name', 'subtitle', 'image', 'slug', 'background_color_for_light_theme', 'background_color_for_dark_theme']);
            $categories = $categories->map(function ($item) {
                $item->makeVisible(['background_color_for_light_theme', 'background_color_for_dark_theme']);
                if ($item->background_color_for_light_theme === 'transparent') {
                    $item->background_color_for_light_theme = '#00000000';
                }
                if ($item->background_color_for_dark_theme === 'transparent') {
                    $item->background_color_for_dark_theme = '#00000000';
                }
                return $item;
            });
            $categories = $categories->makeHidden(['image', 'catActiveChilds', 'cat_active_childs', 'has_active_child']);
            $output['categories'] = $categories->toArray();
        }

        if ($is_brand_section_in_homepage && $is_brand_section_in_homepage == 1) {
            $count_brand_section_in_homepage = CommonHelper::getCountBrandSectionInHomepage();
            $brands = Brand::where('status', 1)
                ->where('module_id', $moduleId)
                ->whereHas('products', function ($query) use ($seller_ids) {
                    $query->whereIn('products.seller_id', $seller_ids)
                        ->where('products.status', 1)
                        ->where('products.is_approved', 1)
                        ->whereExists(function ($categoryQuery) {
                            $categoryQuery->select(DB::raw(1))
                                ->from('categories')
                                ->whereColumn('categories.id', 'products.category_id')
                                ->where('categories.status', 1);
                        });
                })
                ->orderBy('id', 'ASC');
            $brands = $brands->limit($count_brand_section_in_homepage)->get();
            $brands = $brands->map(function ($item) {
                $item->makeVisible(['background_color_for_light_theme', 'background_color_for_dark_theme']);
                if ($item->background_color_for_light_theme === 'transparent') {
                    $item->background_color_for_light_theme = '#00000000';
                }
                if ($item->background_color_for_dark_theme === 'transparent') {
                    $item->background_color_for_dark_theme = '#00000000';
                }
                return $item;
            });
            $brands = $brands->makeHidden(['created_at', 'updated_at', 'image', 'status']);
            $output['brands'] = $brands->toArray();
        }

        if ($is_seller_section_in_homepage && $is_seller_section_in_homepage == 1) {
            $count_seller_section_in_homepage = CommonHelper::getIsSellerSectionInHomepage()['count_seller_section_in_homepage'];
            $sellers = Seller::select('sellers.id', 'sellers.name', 'sellers.store_name', 'sellers.logo', DB::raw("ROUND(6371 * acos(cos(radians(" . $request->latitude . "))
                                * cos(radians(sellers.latitude)) * cos(radians(sellers.longitude) - radians(" . $request->longitude . "))
                                + sin(radians(" . $request->latitude . ")) * sin(radians(sellers.latitude))), 2) AS distance"), 'cities.max_deliverable_distance')
                ->leftJoin("cities", "sellers.city_id", "cities.id")
                ->where('status', Seller::$statusActive)
                ->where('sellers.module_id', $moduleId)
                ->whereExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('products')
                        ->whereColumn('products.seller_id', 'sellers.id');
                })
                ->withCount(['products as total_products' => function ($query) use ($moduleId) {
                    $query->where('status', 1)
                          ->where('is_approved', 1)
                          ->where('module_id', $moduleId)
                          ->whereHas('category', function ($q) {
                              $q->where('status', 1)
                                ->whereRaw('(FIND_IN_SET(categories.id, (SELECT categories FROM sellers WHERE sellers.id = products.seller_id)) OR FIND_IN_SET(categories.parent_id, (SELECT categories FROM sellers WHERE sellers.id = products.seller_id)))');
                          });
                }])
                ->whereIn('sellers.id', $seller_ids)
                ->orderBy('distance', 'asc')
                ->limit($count_seller_section_in_homepage)
                ->get();

            $sellers = $sellers->makeHidden(['national_identity_card_url', 'address_proof_url', 'logo', 'catActiveChilds', 'cat_active_childs', 'has_child', 'has_active_child', 'categories']);
            $output['sellers'] = $sellers->toArray();
        }
        if ($is_country_section_in_homepage && $is_country_section_in_homepage == 1) {
            $count_country_section_in_homepage = CommonHelper::getIsCountrySectionInHomepage()['count_country_section_in_homepage'];
            $countries = Country::orderBy('id', 'ASC')
                ->where('status', 1)
                ->whereExists(function ($query) use ($seller_ids, $moduleId) {
                    $query->select(DB::raw(1))
                        ->from('products')
                        ->whereColumn('products.made_in', 'countries.id')
                        ->whereIn('products.seller_id', $seller_ids)  // Check seller_id
                        ->where('products.status', 1)                // Product status = 1
                        ->where('products.module_id', $moduleId)     // Filter by module
                        ->where('products.is_approved', 1)           // Product is approved
                        ->whereExists(function ($subQuery) {
                            $subQuery->select(DB::raw(1))
                                ->from('categories')
                                ->whereColumn('categories.id', 'products.category_id')
                                ->where('categories.status', 1);   // Category status = 1
                        });
                });

            $countries = $countries->limit($count_country_section_in_homepage)->get();
            $countries = $countries->map(function ($item) {
                $item->makeVisible(['background_color_for_light_theme', 'background_color_for_dark_theme']);
                if ($item->background_color_for_light_theme === 'transparent') {
                    $item->background_color_for_light_theme = '#00000000';
                }
                if ($item->background_color_for_dark_theme === 'transparent') {
                    $item->background_color_for_dark_theme = '#00000000';
                }
                return $item;
            });
            $countries = $countries->makeHidden(['created_at', 'updated_at', 'status']);
            $output['countries'] = $countries->toArray();
        }
        return $output;
    }
}
