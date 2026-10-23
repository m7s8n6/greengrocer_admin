<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Section;
use App\Models\City;
use App\Models\OrderItem;
use App\Models\AdminToken;
use Illuminate\Http\Request;
use App\Helpers\CommonHelper;
use App\Models\ProductVariant;
use App\Models\OrderStatusList;
use App\Models\PanelNotification;
use App\Models\SellerWalletTransaction;
use App\Services\LanguageService;
use App\Models\UserSubscription;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function index()
    {
        $moduleId = request()->header('X-Module-Id') ?: 1;

        //for dashboard stats
        $data = array();

        // Helper function for percentage trend calculation
        $calculateTrend = function ($current, $previous) {
            if ($previous == 0) {
                return $current > 0 ? 100.0 : 0.0;
            }
            return round((($current - $previous) / $previous) * 100, 1);
        };

        // Trend 1: Total Orders
        $currentOrders = Order::where('module_id', $moduleId)->where('created_at', '>=', Carbon::now()->subDays(30))->count();
        $previousOrders = Order::where('module_id', $moduleId)->whereBetween('created_at', [Carbon::now()->subDays(60), Carbon::now()->subDays(30)])->count();
        $totalOrdersTrendVal = $calculateTrend($currentOrders, $previousOrders);
        $data['total_orders_trend_up'] = $totalOrdersTrendVal >= 0;
        $data['total_orders_trend'] = abs($totalOrdersTrendVal) . '%';

        // Trend 2: Revenue
        $currentRevenue = Order::where('module_id', $moduleId)->where('active_status', '!=', OrderStatusList::$cancelled)->where('created_at', '>=', Carbon::now()->subDays(30))->sum('final_total');
        $previousRevenue = Order::where('module_id', $moduleId)->where('active_status', '!=', OrderStatusList::$cancelled)->whereBetween('created_at', [Carbon::now()->subDays(60), Carbon::now()->subDays(30)])->sum('final_total');
        $revenueTrendVal = $calculateTrend($currentRevenue, $previousRevenue);
        $data['revenue_trend_up'] = $revenueTrendVal >= 0;
        $data['revenue_trend'] = abs($revenueTrendVal) . '%';

        // Trend 3: Active Customers
        $currentUsers = User::where('status', '!=', 2)->where('created_at', '>=', Carbon::now()->subDays(30))->count();
        $previousUsers = User::where('status', '!=', 2)->whereBetween('created_at', [Carbon::now()->subDays(60), Carbon::now()->subDays(30)])->count();
        $usersTrendVal = $calculateTrend($currentUsers, $previousUsers);
        $data['customers_trend_up'] = $usersTrendVal >= 0;
        $data['customers_trend'] = abs($usersTrendVal) . '%';

        // Trend 4: Pending Orders
        $currentPending = Order::where('module_id', $moduleId)->whereIn('active_status', [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$selfPickupPending])
            ->where('created_at', '>=', Carbon::now()->subDays(30))->count();
        $previousPending = Order::where('module_id', $moduleId)->whereIn('active_status', [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$selfPickupPending])
            ->whereBetween('created_at', [Carbon::now()->subDays(60), Carbon::now()->subDays(30)])->count();
        $pendingTrendVal = $calculateTrend($currentPending, $previousPending);
        $data['pending_orders_trend_up'] = $pendingTrendVal >= 0;
        $data['pending_orders_trend'] = abs($pendingTrendVal) . '%';

        // Trend 5: Delivered Orders
        $currentDelivered = Order::where('module_id', $moduleId)->whereIn('active_status', [OrderStatusList::$delivered, OrderStatusList::$selfPickupPicked])
            ->where('created_at', '>=', Carbon::now()->subDays(30))->count();
        $previousDelivered = Order::where('module_id', $moduleId)->whereIn('active_status', [OrderStatusList::$delivered, OrderStatusList::$selfPickupPicked])
            ->whereBetween('created_at', [Carbon::now()->subDays(60), Carbon::now()->subDays(30)])->count();
        $deliveredTrendVal = $calculateTrend($currentDelivered, $previousDelivered);
        $data['delivered_orders_trend_up'] = $deliveredTrendVal >= 0;
        $data['delivered_orders_trend'] = abs($deliveredTrendVal) . '%';

        $data['order_count'] = Order::where('module_id', $moduleId)->count();
        // Independent, all-time - matches order_count/customer_count. Previously these weren't
        // sent at all: the frontend derived Revenue by summing the "Highest Revenue Sellers"
        // widget's list (so its own period dropdown silently changed this card too), and derived
        // Pending/Delivered by filtering the "Order Status" widget's list (same problem there).
        $data['revenue'] = (float) Order::where('module_id', $moduleId)->where('active_status', '!=', OrderStatusList::$cancelled)->sum('final_total');
        $data['pending_orders'] = Order::where('module_id', $moduleId)
            ->whereIn('active_status', [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$selfPickupPending])
            ->count();
        $data['delivered_orders'] = Order::where('module_id', $moduleId)
            ->whereIn('active_status', [OrderStatusList::$delivered, OrderStatusList::$selfPickupPicked])
            ->count();
        $data['today_order_count'] = Order::where('module_id', $moduleId)->whereDate('created_at', Carbon::today())->count();
        $data['today_revenue'] = Order::where('module_id', $moduleId)->where('active_status', '!=', OrderStatusList::$cancelled)->whereDate('created_at', Carbon::today())->sum('final_total');
        $data['today_return_count'] = \App\Models\ReturnRequest::join('product_variants', 'return_requests.product_variant_id', '=', 'product_variants.id')
            ->join('products', 'product_variants.product_id', '=', 'products.id')
            ->where('products.module_id', $moduleId)
            ->whereDate('return_requests.created_at', Carbon::today())
            ->count();
        $data['today_cancelled_count'] = Order::where('module_id', $moduleId)->whereDate('created_at', Carbon::today())
            ->where('active_status', OrderStatusList::$cancelled)
            ->count();
        $data['product_count'] = DB::table('products as p')
            ->join('sellers as s', 'p.seller_id', '=', 's.id')
            ->join('product_variants as pv', 'p.id', '=', 'pv.product_id')
            ->where('s.status', 1)
            ->where('p.module_id', $moduleId)
            ->count();
        $data['customer_count'] = User::where('status', '!=', 2)->count();

        $platformPeriod = request('platformPeriod', 'yearly');
        $platformDays = $platformPeriod === 'monthly' ? 30 : 365;
        $platformDateLimit = Carbon::now()->subDays($platformDays);

        // Real platform usage stats from app_usages
        $appUsages = DB::table('app_usages')
            ->select('device_type', DB::raw('count(*) as count'))
            ->where('created_at', '>=', $platformDateLimit)
            ->groupBy('device_type')
            ->get();

        $webCount = 0;
        $androidCount = 0;
        $iosCount = 0;

        foreach ($appUsages as $usage) {
            $device = strtolower($usage->device_type);
            if ($device === 'web') {
                $webCount += $usage->count;
            } elseif ($device === 'android') {
                $androidCount += $usage->count;
            } elseif ($device === 'ios') {
                $iosCount += $usage->count;
            }
        }

        $data['platform_usage'] = [
            'web' => $webCount,
            'android' => $androidCount,
            'ios' => $iosCount,
        ];

        $data['seller_count'] = Seller::where('status', 1)->count();
        $data['category_count'] = Category::where('module_id', $moduleId)->where('status', 1)->count();
        $data['brand_count'] = Brand::where('status', 1)->count();
        $data['section_count'] = Section::count();
        $data['city_count'] = City::count();
        $data['packet_products'] = ProductVariant::leftJoin('products', 'product_variants.product_id', '=', 'products.id')->where('products.type', 'packet')->where('products.module_id', $moduleId)->count();
        $data['loose_products'] = ProductVariant::leftJoin('products', 'product_variants.product_id', '=', 'products.id')->where('products.type', 'loose')->where('products.module_id', $moduleId)->count();

        $data['sold_out_count'] = ProductVariant::Join("products", "product_variants.product_id", "=", "products.id")
            ->join('sellers as s', 'products.seller_id', '=', 's.id')
            ->where('s.status', 1)
            ->where('products.is_unlimited_stock', 0)
            ->where('products.status', 1)
            ->where('products.is_approved', 1)
            ->where('product_variants.status', 0)
            ->where('product_variants.stock', '<=', 0)
            ->where('products.module_id', $moduleId)
            ->count();

        $low_stock = Setting::where('variable', 'low_stock_limit')->first();
        $low_stock_limit = 0;
        if ($low_stock) {
            $low_stock_limit = $low_stock->value;
        }
        $data['low_stock_count'] = ProductVariant::select("product_variants.*")
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            ->where('sellers.status', 1)
            ->where('products.module_id', $moduleId)
            ->where('product_variants.status', ProductVariant::$statusAvailable);
        if (isset($low_stock_limit) && $low_stock_limit !== "" && $low_stock_limit !== 0) {
            $data['low_stock_count'] = $data['low_stock_count']->where('product_variants.stock', '<=', $low_stock_limit)->where('products.is_unlimited_stock', '!=', 1);
        }
        $data['low_stock_count'] = $data['low_stock_count']->count();

        $sellerPeriod = request('sellerPeriod', 'yearly');
        $sellerDays = $sellerPeriod === 'monthly' ? 30 : 365;
        $sellerDateLimit = Carbon::now()->subDays($sellerDays);

        $data['top_sellers'] = OrderItem::select(
            DB::raw("ROUND(SUM(order_items.sub_total),2) as total_revenue"),
            DB::raw("COUNT(DISTINCT order_items.order_id) as order_count"),
            'order_items.seller_id',
            'sellers.name as seller_name',
            'sellers.store_name',
            'sellers.logo'
        )
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('sellers.status', 1)
            ->where('orders.module_id', $moduleId)
            ->where('orders.active_status', '=', OrderStatusList::$delivered)
            ->where('orders.created_at', '>=', $sellerDateLimit)
            ->groupBy('order_items.seller_id')
            ->orderBy('total_revenue', 'DESC')
            ->where('sellers.name', '!=', null)
            ->get();

        // Add seller name and store_name as all-language translations (keyed by language code); fallback to default lang if missing
        if ($data['top_sellers']->isNotEmpty()) {
            $languageService = app(LanguageService::class);
            $defaultLang = $languageService->getDefaultLanguage();
            $defaultCode = $defaultLang ? $languageService->getLanguageCode($defaultLang->id) : 'en';
            $activeLangCodes = collect($languageService->getActiveLanguages())->pluck('code')->filter()->values()->all();

            $sellerIds = $data['top_sellers']->pluck('seller_id')->unique()->filter()->values();
            $sellers = Seller::whereIn('id', $sellerIds)->with('translations')->get()->keyBy('id');
            foreach ($data['top_sellers'] as $row) {
                $origStoreName = $row->store_name ?? '';
                $seller = $sellers->get($row->seller_id);
                $nameByCode = [];
                $storeNameByCode = [];
                if ($seller) {
                    $all = $seller->getAllActiveLanguageTranslations();
                    foreach ($all as $t) {
                        $code = $t['language_code'] ?? '';
                        if ($code !== '') {
                            $nameByCode[$code] = trim((string) ($t['name'] ?? ''));
                            $storeNameByCode[$code] = trim((string) ($t['store_name'] ?? ''));
                        }
                    }
                }
                $defaultName = $nameByCode[$defaultCode] ?? $row->seller_name ?? '';
                $defaultStoreName = $storeNameByCode[$defaultCode] ?? $origStoreName;
                $row->name = (object) [];
                $row->store_name = (object) [];
                foreach ($activeLangCodes as $code) {
                    $row->name->{$code} = ($nameByCode[$code] ?? '') !== '' ? $nameByCode[$code] : $defaultName;
                    $row->store_name->{$code} = ($storeNameByCode[$code] ?? '') !== '' ? $storeNameByCode[$code] : $defaultStoreName;
                }
                if ((array) $row->name === []) {
                    $row->name = (object) ['en' => $row->seller_name ?? ''];
                    $row->store_name = (object) ['en' => $origStoreName];
                }

                if (!empty($row->logo)) {
                    $row->logo_url = asset('storage/' . $row->logo);
                } else {
                    $row->logo_url = null;
                }
            }
        }

        $sellingPeriod = request('sellingPeriod', 'yearly');
        $sellingDays = $sellingPeriod === 'monthly' ? 30 : 365;
        $sellingDateLimit = Carbon::now()->subDays($sellingDays);

        // Ratings (average_rating/review_count) are only needed for the final top-10 rows,
        // so fetch the top-10-by-revenue first (no correlated subqueries), then look up
        // ratings for just those 10 products - instead of computing ratings for every
        // distinct product sold in the period before the LIMIT could trim it down.
        //
        // STRAIGHT_JOIN forces the join order to follow this clause order (order_items ->
        // orders -> product_variants -> products -> sellers -> categories) instead of
        // letting the optimizer start from `products` with a full table scan - its cost
        // estimator picks that plan regardless of JOIN vs LEFT JOIN, so this is the only
        // reliable way to keep it on the indexed order_items/orders path.
        $data['top_selling_products'] = collect(DB::select("
            SELECT STRAIGHT_JOIN
                product_variants.product_id,
                product_variants.id,
                products.name as product_name,
                products.image,
                products.category_id,
                products.seller_id,
                categories.name as category_name,
                product_variants.measurement,
                order_items.product_name,
                order_items.variant_name,
                ROUND(SUM(order_items.sub_total),2) as total_revenue
            FROM order_items
            JOIN orders ON order_items.order_id = orders.id
            LEFT JOIN product_variants ON order_items.product_variant_id = product_variants.id
            JOIN products ON product_variants.product_id = products.id
            JOIN sellers ON products.seller_id = sellers.id
            JOIN categories ON products.category_id = categories.id
            WHERE sellers.status = 1
              AND orders.module_id = ?
              AND products.module_id = ?
              AND orders.created_at >= ?
              AND orders.active_status = ?
              AND categories.status = 1
            GROUP BY product_variants.product_id
            ORDER BY total_revenue DESC
            LIMIT 10
        ", [$moduleId, $moduleId, $sellingDateLimit->toDateTimeString(), OrderStatusList::$delivered]));

        if ($data['top_selling_products']->isNotEmpty()) {
            $topSellingProductIds = $data['top_selling_products']->pluck('product_id')->unique()->values();
            $ratingsByProductId = \App\Models\ProductRating::select('product_id')
                ->selectRaw('ROUND(AVG(rate), 1) as average_rating')
                ->selectRaw('COUNT(id) as review_count')
                ->whereIn('product_id', $topSellingProductIds)
                ->groupBy('product_id')
                ->get()
                ->keyBy('product_id');

            foreach ($data['top_selling_products'] as $row) {
                $rating = $ratingsByProductId->get($row->product_id);
                $row->average_rating = $rating->average_rating ?? null;
                $row->review_count = $rating->review_count ?? 0;
            }
        }

        $ratedPeriod = request('ratedPeriod', 'yearly');
        $ratedDays = $ratedPeriod === 'monthly' ? 30 : 365;
        $ratedDateLimit = Carbon::now()->subDays($ratedDays);

        $data['top_rated_products'] = Product::select(
            'products.id as product_id',
            'products.name as product_name',
            'products.image',
            'products.category_id',
            'products.seller_id',
            'categories.name as category_name',
            DB::raw("ROUND(AVG(product_ratings.rate), 1) as average_rating"),
            DB::raw("COUNT(product_ratings.id) as review_count")
        )
            ->join('product_ratings', 'products.id', '=', 'product_ratings.product_id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->where('sellers.status', 1)
            ->where('products.module_id', $moduleId)
            ->where('product_ratings.created_at', '>=', $ratedDateLimit)
            ->where('categories.status', 1)
            ->groupBy('products.id')
            ->orderBy('average_rating', 'DESC')
            ->orderBy('review_count', 'DESC')
            ->limit(10)
            ->get();

        $translateProducts = function ($items) {
            if ($items->isEmpty()) {
                return;
            }
            $languageService = app(LanguageService::class);
            $defaultLang = $languageService->getDefaultLanguage();
            $defaultCode = $defaultLang ? $languageService->getLanguageCode($defaultLang->id) : 'en';
            $activeLangCodes = collect($languageService->getActiveLanguages())->pluck('code')->filter()->values()->all();

            $categoryIds = $items->pluck('category_id')->unique()->filter()->values();
            $productIds = $items->pluck('product_id')->unique()->filter()->values();
            $categories = Category::whereIn('id', $categoryIds)->with('translations')->get()->keyBy('id');
            $products = Product::whereIn('id', $productIds)->with('translations')->get()->keyBy('id');

            // products.image only holds the primary image - many products only ever get a
            // gallery image instead (same fallback Product::getImageUrlAttribute() already uses
            // for every other product listing), so without this a product with a gallery-only
            // image shows no image here even though it displays fine everywhere else.
            $missingImageProductIds = $items->filter(fn($row) => empty($row->image))->pluck('product_id')->unique()->filter()->values();
            $galleryImageByProductId = $missingImageProductIds->isEmpty()
                ? collect()
                : DB::table('product_images')
                    ->whereIn('product_id', $missingImageProductIds)
                    ->orderBy('id')
                    ->get(['product_id', 'image'])
                    ->unique('product_id')
                    ->keyBy('product_id');
            foreach ($items as $row) {
                $origCategoryName = $row->category_name ?? '';
                $origProductName = $row->product_name ?? '';
                $categoryNameByCode = [];
                $productNameByCode = [];
                $category = $categories->get($row->category_id);
                if ($category) {
                    $all = $category->getAllActiveLanguageTranslations();
                    foreach ($all as $t) {
                        $code = $t['language_code'] ?? '';
                        if ($code !== '') {
                            $categoryNameByCode[$code] = trim((string) ($t['name'] ?? ''));
                        }
                    }
                }
                $product = $products->get($row->product_id);
                if ($product) {
                    $all = $product->getAllActiveLanguageTranslations();
                    foreach ($all as $t) {
                        $code = $t['language_code'] ?? '';
                        if ($code !== '') {
                            $productNameByCode[$code] = trim((string) ($t['name'] ?? ''));
                        }
                    }
                }
                $defaultCategoryName = $categoryNameByCode[$defaultCode] ?? $origCategoryName;
                $defaultProductName = $productNameByCode[$defaultCode] ?? $origProductName;
                $row->category_name = (object) [];
                $row->product_name = (object) [];
                foreach ($activeLangCodes as $code) {
                    $row->category_name->{$code} = ($categoryNameByCode[$code] ?? '') !== '' ? $categoryNameByCode[$code] : $defaultCategoryName;
                    $row->product_name->{$code} = ($productNameByCode[$code] ?? '') !== '' ? $productNameByCode[$code] : $defaultProductName;
                }
                if ((array) $row->category_name === []) {
                    $row->category_name = (object) ['en' => $origCategoryName];
                }
                if ((array) $row->product_name === []) {
                    $row->product_name = (object) ['en' => $origProductName];
                }

                if (!empty($row->image)) {
                    $row->image_url = asset('storage/' . $row->image);
                } else {
                    $gallery = $galleryImageByProductId->get($row->product_id);
                    $row->image_url = $gallery ? asset('storage/' . $gallery->image) : null;
                }
            }
        };

        $translateProducts($data['top_selling_products']);
        $translateProducts($data['top_rated_products']);
        $categoryPeriod = request('categoryPeriod', 'yearly');
        $categoryDays = $categoryPeriod === 'monthly' ? 30 : 365;
        $categoryDateLimit = Carbon::now()->subDays($categoryDays);

        $data['top_categories_sales'] = OrderItem::select(
            'products.category_id',
            'categories.name as category_name',
            DB::raw("ROUND(SUM(order_items.sub_total), 2) as total_revenue")
        )
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->where('orders.module_id', $moduleId)
            ->where('products.module_id', $moduleId)
            ->where('orders.active_status', '=', OrderStatusList::$delivered)
            ->where('categories.status', 1)
            ->where('orders.created_at', '>=', $categoryDateLimit)
            ->groupBy('products.category_id')
            ->orderBy('total_revenue', 'DESC')
            ->limit(5)
            ->get();

        if ($data['top_categories_sales']->isNotEmpty()) {
            $languageService = app(LanguageService::class);
            $defaultLang = $languageService->getDefaultLanguage();
            $defaultCode = $defaultLang ? $languageService->getLanguageCode($defaultLang->id) : 'en';
            $activeLangCodes = collect($languageService->getActiveLanguages())->pluck('code')->filter()->values()->all();

            $categoryIds = $data['top_categories_sales']->pluck('category_id')->unique()->filter()->values();
            $categories = Category::whereIn('id', $categoryIds)->with('translations')->get()->keyBy('id');
            foreach ($data['top_categories_sales'] as $row) {
                $origCategoryName = $row->category_name ?? '';
                $categoryNameByCode = [];
                $category = $categories->get($row->category_id);
                if ($category) {
                    $all = $category->getAllActiveLanguageTranslations();
                    foreach ($all as $t) {
                        $code = $t['language_code'] ?? '';
                        if ($code !== '') {
                            $categoryNameByCode[$code] = trim((string) ($t['name'] ?? ''));
                        }
                    }
                }
                $defaultCategoryName = $categoryNameByCode[$defaultCode] ?? $origCategoryName;
                $row->category_name = (object) [];
                foreach ($activeLangCodes as $code) {
                    $row->category_name->{$code} = ($categoryNameByCode[$code] ?? '') !== '' ? $categoryNameByCode[$code] : $defaultCategoryName;
                }
                if ((array) $row->category_name === []) {
                    $row->category_name = (object) ['en' => $origCategoryName];
                }
            }
        }

        $data['status_order_count'] = CommonHelper::getStatusOrderCount();

        return CommonHelper::responseWithData($data);
    }
    public function doLanguageChange(Request $request)
    {
        Session::put('lang', $request->language);
        Session::put('app_locale', $request->language);
        return response()->json(['status' => true]);
    }

    public function clearLanguageSession()
    {
        Session::forget('lang');
        Session::forget('app_locale');
        return response()->json(['status' => true, 'message' => 'Language session cleared']);
    }
    public function createSlug($text)
    {
        $slug = CommonHelper::slugify($text);
        return CommonHelper::responseWithData($slug);
    }

    public function getTopNotifications()
    {
        $notificationsQuery = PanelNotification::where('notifiable_id', auth()->user()->id);
        $unReadCount = (clone $notificationsQuery)->where('read_at', NULL)->count();
        $notifications = $notificationsQuery->orderBy('created_at', 'DESC')->limit(10)->get();

        $orderIds = $notifications->map(function ($notification) {
            return $notification->data['order_id'] ?? null;
        })->filter()->unique()->values()->all();

        $orders = [];
        if (!empty($orderIds)) {
            $orders = Order::with(['user', 'items.seller.translations'])->withoutGlobalScope('module')->whereIn('id', $orderIds)->get()->keyBy('id');
        }

        $currency = Setting::get_value('currency') ?? '₹';
        // Without eager-loading translations, Module's translated-name accessor re-queries
        // module_translations fresh every time it's read later in this method - and it gets
        // read once per notification below, so the same module_id repeats identically.
        $modules = \App\Models\Module::with('translations')->get()->keyBy('id');

        // Enrich notifications with real order details
        $notifications->map(function ($notification) use ($orders, $currency, $modules) {
            $data = $notification->data;
            if (isset($data['order_id'])) {
                $orderId = $data['order_id'];
                $order = $orders[$orderId] ?? null;
                if ($order) {
                    $customerName = $order->user ? $order->user->name : 'Customer';
                    $storeName = 'Store';
                    if ($order->items->isNotEmpty() && $order->items->first()->seller) {
                        $storeName = $order->items->first()->seller->store_name;
                    }
                    $data['customer_name'] = $customerName;
                    $data['store_name'] = $storeName;
                    $data['total'] = $order->total;
                    $data['currency'] = $currency;
                    $data['module_name'] = isset($modules[$order->module_id]) ? strtolower($modules[$order->module_id]->name) : 'grocery';
                }
            }
            $notification->data = $data;
            return $notification;
        });

        $data = array();
        $data['unread'] = $unReadCount;
        $data['notifications'] = $notifications;
        return CommonHelper::responseWithData($data);
    }

    public function markAsReadNotifications(Request $request)
    {
        auth()->user()
            ->unreadNotifications
            ->when($request->input('id'), function ($query) use ($request) {
                return $query->where('id', $request->input('id'));
            })
            ->markAsRead();
        return CommonHelper::responseWithData("Notification Mark as Read Successfully!");
    }

    public function deploy()
    {

        exec("git pull origin 1.9 2>&1", $output);
        echo "<pre>";
        var_dump($output);
        echo "</pre>";

        exec("composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev");
        exec("php artisan migrate");

        echo "<br><br>Done";
    }

    public function updateToken(Request $request)
    {
        AdminToken::firstOrCreate([
            'user_id' => auth()->user()->id,
            'type' => auth()->user()->role->name,
            'fcm_token' => $request->token
        ]);

        return response()->json(['success' => true]);
    }

    public function setSellerWalletTransaction()
    {
        try {

            $this->expireUserSubscriptions();

            $items = OrderItem::with(['productVariant', 'seller'])
                ->where('active_status', 6)->where('is_credited', 0)
                ->get();
            $productIds = $items->pluck('productVariant.product_id')->unique();
            $productInfo = Product::whereIn('id', $productIds)
                ->select('id', 'return_status', 'return_days', 'seller_id', 'category_id')
                ->get()
                ->keyBy('id');

            foreach ($items as $item) {
                try {

                    if (is_object($item->productVariant)) {

                        $productId = $item->productVariant->product_id;
                        $product_info = $productInfo->get($productId);

                        if ($product_info && $product_info->return_status == 1) {
                            if (today() > $item->created_at->addDays($product_info->return_days)) {
                                $this->processSellerTransaction($item, $product_info);
                            }
                        } else {
                            $this->processSellerTransaction($item, $product_info);
                        }
                    }
                } catch (\Exception $e) {
                    Log::error("Set seller wallet transaction :", [$e->getMessage()]);
                }
            }
        } catch (\Exception $e) {

            Log::error("Set seller wallet transactions :", [$e->getMessage()]);
        }
    }

    private function processSellerTransaction($item, $product_info)
    {
        try {
            $existsInSellerWalletTransaction = SellerWalletTransaction::where('order_item_id', $item->id)->exists();

            if (!$existsInSellerWalletTransaction) {

                $commission = isset($item->seller->commission) ? $item->seller->commission : 0;

                $admin_commission_amount = $item->sub_total * $commission / 100;
                $seller_amount = $item->sub_total - $admin_commission_amount;
                $seller_id = $item->seller_id;

                $getSellerWalletBalance = CommonHelper::getSellerWalletBalance($seller_id);
                $new_balance = $getSellerWalletBalance + $seller_amount;

                CommonHelper::updateSellerWalletBalance($new_balance, $seller_id);
                CommonHelper::addSellerWalletTransaction($item->order_id, $item->id, $seller_id, 'credit', $seller_amount, 'seller_wallet_order_item_commission');

                CommonHelper::addAdminCommissionTransaction($item->order_id, $item->id, $seller_id, $commission, $admin_commission_amount, $item->sub_total);

                SellerWalletTransaction::where('order_item_id', $item->id)->update(['is_commission' => 1]);

                OrderItem::where('id', $item->id)->update(['is_credited' => 1]);
            }
        } catch (\Exception $e) {

            Log::error("Process seller transaction :", [$e->getMessage()]);
        }
    }

    private function expireUserSubscriptions()
    {
        try {
            $now = now()->toDateString();

            UserSubscription::where('status', 'active')
                ->whereDate('end_date', '<', $now)
                ->update([
                    'status' => 'expired',
                    'updated_at' => $now
                ]);
        } catch (\Exception $e) {
            Log::error("Expire user subscriptions :", [$e->getMessage()]);
        }
    }

    public function unauthorized()
    {
        $data = [];
        $invoice = view('unauthorized', $data)->render();
        return $invoice;
    }
    /**
     * Public (no token) settings for the partner apps (seller / delivery boy) to read
     * before login. Keep this to non-sensitive flags only.
     */
    public function getPublicSettings()
    {
        return CommonHelper::responseWithData([
            'is_demo_mode_on' => isDemoModeOn(),
        ]);
    }

    public function getAdminSettings()
    {
        $logo = "";
        $app_name = "";
        $support_email = "";
        $support_number = "";
        $google_place_api_key = "";
        $google_map_api_key = "";
        $googleMapApiKey = "";
        $currency = "";
        $purchase_code = "";
        $logo_full_path = "";
        $delivery_boy_bonus_settings = 0;
        $isDemoMode = 0;

        $website_url = "";
        $copyright_details = "";

        // Firebase keys
        $apiKey = "";
        $authDomain = "";
        $projectId = "";
        $storageBucket = "";
        $messagingSenderId = "";
        $appId = "";
        $measurementId = "";


        $app_name = Setting::get_value('app_name') ?? "eMarket";
        $support_email = Setting::get_value('support_email') ?? "";
        $support_number = Setting::get_value('support_number') ?? "";

        $logo = Setting::get_value('logo') ?? "";
        if ($logo !== "") {
            $logo_full_path = url('/') . '/storage/' . $logo;
        } else {
            $logo_full_path = asset('images/favicon.png');
        }

        $panel_login_background_img = Setting::get_value('panel_login_background_img') ?? "";
        $panel_login_background_img_full_path = '';
        if ($panel_login_background_img !== "") {
            $panel_login_background_img_full_path = url('/') . '/storage/' . $panel_login_background_img;
        } else {
            $panel_login_background_img_full_path = asset('images/panel_login_background_img.jpg');
        }

        $google_place_api_key = Setting::get_value('google_place_api_key') ?? "";
        $google_map_api_key = Setting::get_value('google_map_api_key') ?? "";
        $apiKey = Setting::get_value('firebase_apiKey') ?? "";
        $googleMapApiKey = Setting::get_value('googleMapApiKey') ?? "";
        $currency = Setting::get_value('currency') ?? "$";
        $purchase_code = Setting::get_value('purchase_code') ?? "";

        $website_url = Setting::get_value('website_url') ?? "";
        $copyright_details = Setting::get_value('copyright_details') ?? "";

        $delivery_boy_bonus_settings = Setting::get_value('delivery_boy_bonus_settings') ?? 0;

        // Firebase keys
        $authDomain = Setting::get_value('authDomain') ?? "";
        $projectId = Setting::get_value('projectId') ?? "";
        $storageBucket = Setting::get_value('storageBucket') ?? "";
        $messagingSenderId = Setting::get_value('messagingSenderId') ?? "";
        $appId = Setting::get_value('appId') ?? "";
        $measurementId = Setting::get_value('measurementId') ?? "";

        $isDemoMode = isDemoMode() ?? 0;


        return response()->json([
            'app_name' => $app_name,
            'support_email' => $support_email,
            'support_number' => $support_number,
            'logo_full_path' => $logo_full_path,
            'panel_login_background_img_full_path' => $panel_login_background_img_full_path,
            'google_place_api_key' => $google_place_api_key,
            'google_map_api_key' => $google_map_api_key,
            'googleMapApiKey' => $googleMapApiKey,
            'currency' => $currency,
            'purchase_code' => $purchase_code,
            'website_url' => $website_url,
            'copyright_details' => $copyright_details,
            'delivery_boy_bonus_settings' => $delivery_boy_bonus_settings,
            'firebase' => [
                'apiKey' => $apiKey,
                'authDomain' => $authDomain,
                'projectId' => $projectId,
                'storageBucket' => $storageBucket,
                'messagingSenderId' => $messagingSenderId,
                'appId' => $appId,
                'measurementId' => $measurementId,
            ],
            'isDemoMode' => $isDemoMode,
        ]);
    }
}
