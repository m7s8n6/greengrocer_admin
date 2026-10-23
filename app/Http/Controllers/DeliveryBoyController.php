<?php

namespace App\Http\Controllers;

use App\Helpers\CommonHelper;
use App\Http\Controllers\API\OrdersApiController;
use App\Http\Controllers\API\OrderStatusApiController;
use App\Models\Category;
use App\Models\DeliveryBoy;
use App\Models\FundTransfer;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\OrderStatusList;
use App\Models\PanelNotification;
use App\Models\Setting;
use App\Models\DeliveryBoyTransaction;
use App\Models\LiveTracking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class DeliveryBoyController extends BaseController
{
    public function index(){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $data = array();
        $data['order_count'] = Order::where('delivery_boy_id',$delivery_boy_id)->count();
        $data['pending_orders'] = Order::where('delivery_boy_id',$delivery_boy_id)
            ->whereIn('active_status', [
                OrderStatusList::$received,
                OrderStatusList::$processed,
                OrderStatusList::$shipped,
                OrderStatusList::$outForDelivery
            ])->count();
        $data['delivered_orders'] = Order::where('delivery_boy_id',$delivery_boy_id)
            ->where('active_status', OrderStatusList::$delivered)->count();
        $data['return_requests'] = \App\Models\ReturnRequest::where('delivery_boy_id', $delivery_boy_id)->count();
        $data['cash_in_hand'] = number_format(auth()->user()->deliveryBoy->cash_received, 2);
        $data['balance'] = number_format(auth()->user()->deliveryBoy->balance, 2);
        return CommonHelper::responseWithData($data);
    }
    public function doLanguageChange(Request $request)
    {
        Session::put('lang',$request->language);
        return response()->json(['status' => true]);
    }

    public function createSlug($text){
        $slug = CommonHelper::slugify($text);
        return CommonHelper::responseWithData($slug);
    }

    public function getTopNotifications(){
        $notifications = PanelNotification::where('notifiable_id',auth()->user()->id);
        $unReadCount = (clone $notifications)->where('read_at',NULL)->get()->count();
        $notifications = $notifications->orderBy('created_at','DESC')->get();

        $data = array();
        $data['unread'] = $unReadCount;
        $data['notifications'] = $notifications;
        return CommonHelper::responseWithData($data);
    }

    public function markAsReadNotifications(Request $request){

        auth()->user()
            ->unreadNotifications
            ->when($request->input('id'), function ($query) use ($request) {
                return $query->where('id', $request->input('id'));
            })
            ->markAsRead();
        return CommonHelper::responseWithData("Notification Mark as Read Successfully!");

    }

    public function getOrders(Request $request){

        $delivery_boy_id = auth()->user()->deliveryBoy->id;

        $limit = (int) ($request->limit ?? 12);
        $offset = (int) ($request->offset ?? 0);
        $includeTotal = filter_var($request->input('include_total', true), FILTER_VALIDATE_BOOLEAN);

        // Parse dates only when provided (avoid errors and overhead)
        $startDate = (isset($request->startDate) && $request->startDate != "") ? Carbon::parse($request->startDate)->startOfDay() : null;
        $endDate = (isset($request->endDate) && $request->endDate != "") ? Carbon::parse($request->endDate)->endOfDay() : null;
        $startDeliveryDate = (isset($request->startDeliveryDate) && $request->startDeliveryDate != "") ? date('Y-m-d', strtotime($request->startDeliveryDate)) : null;
        $endDeliveryDate = (isset($request->endDeliveryDate) && $request->endDeliveryDate != "") ? date('Y-m-d', strtotime($request->endDeliveryDate)) : null;

        $sellerSubquery = "(SELECT s.name FROM order_items oi JOIN sellers s ON oi.seller_id = s.id WHERE oi.order_id = orders.id LIMIT 1)";
        $orders = Order::select(
            'orders.*',
            'orders.id as order_id',
            'delivery_boys.name as delivery_boy_name',
            DB::raw("{$sellerSubquery} as seller_name"),
            'users.name as user_name',
            'users.mobile as user_mobile',
            'users.country_code as user_country_code',
            'orders.active_status as order_status'
        )
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('delivery_boys', 'orders.delivery_boy_id', '=', 'delivery_boys.id')
            ->where('orders.delivery_boy_id', $delivery_boy_id);

        if ($startDate && $endDate) {
            $orders = $orders->whereBetween('orders.created_at', [$startDate, $endDate]);
        }

        if ($startDeliveryDate && $endDeliveryDate) {
            $orders = $orders->whereRaw(
                "STR_TO_DATE(SUBSTRING_INDEX(orders.delivery_time, ' ', 1), '%d-%m-%Y') BETWEEN ? AND ?",
                [$startDeliveryDate, $endDeliveryDate]
            );
        }

        if (isset($request->status) && $request->status != "" && $request->status != 0) {
            $orders = $orders->where('orders.active_status', $request->status);
        }
        if (isset($request->search) && !empty($request->search)) {
            $search = $request->search;
            $orders = $orders->where(function ($query) use ($search, $sellerSubquery) {
                $query->where('orders.id', 'LIKE', "%$search%")
                    ->orWhere('users.name', 'LIKE', "%$search%")
                    ->orWhere('users.mobile', 'LIKE', "%$search%")
                    ->orWhere('orders.mobile', 'LIKE', "%$search%")
                    ->orWhere('orders.payment_method', 'LIKE', "%$search%")
                    ->orWhere('orders.delivery_charge', 'LIKE', "%$search%")
                    ->orWhere('orders.wallet_balance', 'LIKE', "%$search%")
                    ->orWhere('orders.final_total', 'LIKE', "%$search%")
                    ->orWhere('orders.remaining_final', 'LIKE', "%$search%")
                    ->orWhere('orders.total', 'LIKE', "%$search%")
                    ->orWhere('orders.delivery_time', 'LIKE', "%$search%")
                    ->orWhereRaw("({$sellerSubquery}) LIKE ?", ["%$search%"])
                    ->orWhere('delivery_boys.name', 'LIKE', "%$search%");
            });
        }

        if (isset($request->type)) {
            $activeTypeStatus = [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$processed, OrderStatusList::$outForDelivery, OrderStatusList::$shipped];
            $previousTypeStatus = [OrderStatusList::$delivered, OrderStatusList::$cancelled, OrderStatusList::$returned];
            if ($request->type == Order::$activeType) {
                $orders = $orders->whereIn('orders.active_status', $activeTypeStatus);
            } else {
                $orders = $orders->whereIn('orders.active_status', $previousTypeStatus);
            }
        }

        // Lightweight count (no seller subquery) - run before get()
        $ordersForCount = clone $orders;
        $ordersForCount->getQuery()->select(DB::raw('orders.id'));
        $totalOrder = $ordersForCount->count();

        // Fetch only the limited rows (skip/take applied)
        $orders = $orders->orderBy('orders.updated_at', 'DESC')->skip($offset)->take((int) $limit)->get();

        // Fetch OTP setting once instead of per order
        $generate_otp = Setting::get_value("generate_otp");
        foreach ($orders as $key => $row) {
            if ($generate_otp == 0) {
                $orders[$key]->otp = 0;
            }
        }

        // Order items query: no product/variant joins needed (not selected)
        $order_items = Order::select('order_items.*','orders.mobile','orders.total' ,'orders.delivery_charge','orders.discount','orders.promo_code',
            'orders.promo_discount','orders.wallet_balance','orders.final_total','orders.remaining_final','orders.payment_method','orders.address','orders.delivery_time',
            'users.name as user_name','order_items.status as order_status','sellers.name as seller_name')
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')
            ->where('orders.delivery_boy_id', $delivery_boy_id);

        if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != ""){
            $order_items = $order_items->whereBetween('order_items.created_at', [$startDate, $endDate]);
        }

        if(isset($request->startDeliveryDate) && $request->startDeliveryDate != "" && isset($request->endDeliveryDate) && $request->endDeliveryDate != ""){
            // Convert start and end dates from request to Y-m-d format
            $startDeliveryDate = date('Y-m-d', strtotime($request->startDeliveryDate));
            $endDeliveryDate = date('Y-m-d', strtotime($request->endDeliveryDate));

            // Define a callback function to extract and format the delivery_time date
            $order_items = $order_items->where(function($query) use ($startDeliveryDate, $endDeliveryDate) {
                $query->whereRaw("STR_TO_DATE(SUBSTRING_INDEX(orders.delivery_time, ' ', 1), '%d-%m-%Y') BETWEEN ? AND ?", [$startDeliveryDate, $endDeliveryDate]);
            });
        }

        if(isset($request->status) && $request->status != "" && $request->status != 0){
            $order_items = $order_items->where('orders.active_status', $request->status);
        }

        if (isset($request->type)) {
            $activeTypeStatus = [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$processed, OrderStatusList::$outForDelivery, OrderStatusList::$shipped];
            $previousTypeStatus = [OrderStatusList::$delivered, OrderStatusList::$cancelled, OrderStatusList::$returned];
            if ($request->type == Order::$activeType) {
                $order_items = $order_items->whereIn('orders.active_status', $activeTypeStatus);
            } else {
                $order_items = $order_items->whereIn('orders.active_status', $previousTypeStatus);
            }
        }

        $totalOrderItem = clone $order_items;
        $totalOrderItem = $totalOrderItem->count();
        $order_items = $order_items->orderBy('order_items.updated_at','DESC')->skip($offset)->take($limit)->get();

        // Attach translated order status name
        $useContentLanguage = $request->header('Content-Language') !== null
            && trim((string) $request->header('Content-Language')) !== '';
        $previousLocale = app()->getLocale();
        if ($useContentLanguage) {
            $langCode = app()->has('lang_code') ? app('lang_code') : 'en';
            app()->setLocale($langCode);
        }

        foreach ($orders as $row) {
            $row->order_status_name = OrderStatusList::getTranslatedName((int) ($row->order_status ?? 0));
        }

        foreach ($order_items as $row) {
            $row->order_status_name = OrderStatusList::getTranslatedName((int) ($row->active_status ?? 0));
        }

        app()->setLocale($previousLocale);

        $data = array(
            "orders" => $orders,
            "total_order_item" => $totalOrderItem,
            "order_items" => $order_items
        );
        return CommonHelper::responseWithData($data,$totalOrder);
    }
    public function getOrder(Request $request){
        return app(OrdersApiController::class)->view($request->order_id);
    }
    public function getOrderStatus(Request $request){
        return app(OrderStatusApiController::class)->getOrderStatus($request);
    }
    public function getCashCollection(Request $request){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $transactions = DeliveryBoyTransaction::select( 'orders.*','delivery_boy_transactions.*','delivery_boys.name','delivery_boys.mobile' )

        ->leftJoin('orders', 'delivery_boy_transactions.order_id', '=', 'orders.id')
        ->leftJoin('delivery_boys', 'delivery_boy_transactions.delivery_boy_id', '=', 'delivery_boys.id')
        ->where('delivery_boy_transactions.delivery_boy_id', $delivery_boy_id)
        ->where(function ($query) {
            $query->where('delivery_boy_transactions.type', DeliveryBoyTransaction::$paymentTypeCod)
                ->orWhere('delivery_boy_transactions.type', 'delivery_boy_cash_collection');
        });
        if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != ""){
            $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
            $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
            $transactions = $transactions->whereBetween('delivery_boy_transactions.created_at', [$startDate, $endDate]);
        }
        if (isset($request->search) && !empty($request->search)) {
            $searchTerm = $request->search;
            $transactions = $transactions->where('delivery_boy_transactions.id', 'LIKE', '%' . $searchTerm . '%')->orWhere('orders.id', 'LIKE', '%' . $searchTerm . '%')
                ->orwhere('delivery_boy_transactions.type', 'LIKE', '%' . $searchTerm . '%')->orWhere('delivery_boy_transactions.amount', 'LIKE', '%' . $searchTerm . '%')
               ->orWhere('delivery_boy_transactions.message', 'LIKE', '%' . $searchTerm . '%');
        }
        $transactions = $transactions->orderBy('delivery_boy_transactions.id','ASC')->get();
        foreach($transactions as $t => $row) {
            if($row['type'] == 'delivery_boy_cash_collection'){
                 $transactions[$t]['type'] = 'Delivery Boy Cash Collection';
                  $transactions[$t]['order_id'] = '-';
                  $transactions[$t]['final_total'] = '-';
                  $transactions[$t]['collected_amount'] = $transactions[$t]['amount'];
                  $transactions[$t]['amount'] = 0;
            }elseif($row['type'] == 'COD'){
                $transactions[$t]['collected_amount'] = 0;
            }
        }
        $data['transactions'] = $transactions;
        $data['cash_in_hand'] = DeliveryBoy::where('id',$delivery_boy_id)->value('cash_received');
        $data['cash_collected'] = DeliveryBoyTransaction::select(DB::raw('SUM(amount) AS total_amt'))->where(['type' => 'delivery_boy_cash_collection', 'delivery_boy_id' => $delivery_boy_id])->value('total_amt');
        $data['transactions'] = $transactions->map(function (DeliveryBoyTransaction $dt) {
            $row = $dt->toArray();
            $rawTransactionDate = $dt->getAttributes()['transaction_date'] ?? null;
            if ($rawTransactionDate !== null && $rawTransactionDate !== '') {
                $row['transaction_date'] = CommonHelper::formatDateTime($rawTransactionDate);
            }
            return $row;
        });
        $total = $transactions->count();
        return CommonHelper::responseWithData( $data,$total);
    }
    public function getFundTransfers(Request $request){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $fundTransfers = FundTransfer::select('delivery_boys.name','delivery_boys.mobile', 'fund_transfers.*')
            ->leftJoin('delivery_boys', 'fund_transfers.delivery_boy_id', '=', 'delivery_boys.id')->where('fund_transfers.delivery_boy_id', $delivery_boy_id);

            if (isset($request->search) && !empty($request->search)) {
            $searchTerm = $request->search;

                 $fundTransfers = $fundTransfers->where('fund_transfers.id', 'LIKE', '%' . $searchTerm . '%')
                    ->orwhere('fund_transfers.type', 'LIKE', '%' . $searchTerm . '%')->orWhere('fund_transfers.amount', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('fund_transfers.message', 'LIKE', '%' . $searchTerm . '%');
            }
        $fundTransfers = $fundTransfers->orderBy('fund_transfers.id','DESC')->get();
        $fundTransfers = $fundTransfers->map(function (FundTransfer $ft) {
            $row = $ft->toArray();
            $rawCreated = $ft->getAttributes()['created_at'] ?? null;
            if ($rawCreated !== null && $rawCreated !== '') {
                $row['created_at'] = CommonHelper::formatDateTime($rawCreated);
            }
            return $row;
        });
        $total = $fundTransfers->count();

        return CommonHelper::responseWithData($fundTransfers,$total);
    }


    public function getProductSalesReport(Request $request){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
        $ProductSalesReports = OrderItem::select('product_variants.product_id','products.name as product_name',
            'sellers.name as seller_name','product_variants.measurement',
            DB::raw('(SELECT short_code FROM attribute_values WHERE attribute_values.attribute_id = product_variants.stock_unit_id LIMIT 1) AS unit_name'),
            'order_items.*',
            DB::raw('(SELECT COUNT(order_items.product_variant_id) FROM order_items WHERE product_variants.id = order_items.product_variant_id) as total_sales'),
            DB::raw('(SELECT SUM(order_items.sub_total) FROM `order_items` WHERE product_variants.id = order_items.product_variant_id) as total_price')
        )
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            ->where('orders.delivery_boy_id', $delivery_boy_id)
            ->where('orders.active_status', OrderStatusList::$delivered)
            ->orWhere('orders.active_status', OrderStatusList::$selfPickupPicked)
            ->whereBetween('order_items.created_at', [$startDate, $endDate])
            ->orderBy('order_items.id','DESC')
            ->groupBy('product_variants.id')
            ->get();
        return CommonHelper::responseWithData($ProductSalesReports);
    }

    public function getSalesReport(Request $request){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
        $categories = Category::orderBy('id','DESC')->get()->toArray();
        $SalesReports = OrderItem::select('order_items.id','orders.total',
            'order_items.seller_id','order_items.sub_total','orders.user_id','orders.mobile',
            'products.name as product_name','orders.final_total','orders.address',
            'users.name as user_name','order_items.status',
            DB::raw('DATE_FORMAT(order_items.created_at,"%d-%m-%Y") as added_date'))
            ->leftJoin('users', 'order_items.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.delivery_boy_id', $delivery_boy_id)
            ->whereBetween('order_items.created_at', [$startDate, $endDate])
            ->where('orders.active_status', OrderStatusList::$delivered)
            ->orWhere('orders.active_status', OrderStatusList::$selfPickupPicked);
        if(isset($request->category) && $request->category != ""){
            $SalesReports = $SalesReports->where('products.category_id', $request->category);
        }
        $SalesReports = $SalesReports->orderBy('order_items.id','DESC')->get();
        $SalesReports = $SalesReports->map(function (OrderItem $oi) {
            $row = $oi->toArray();
            $rawAddedDate = $oi->getAttributes()['added_date'] ?? null;
            if ($rawAddedDate !== null && $rawAddedDate !== '') {
                $row['added_date'] = CommonHelper::formatDate($rawAddedDate);
            }
            return $row;
        });
        $data = array(
            "categories" => $categories,
            "salesReports" => $SalesReports
        );
        return CommonHelper::responseWithData($data);
    }
    public function getSettings(){

        $variables = array(
            "app_name",
            "support_number",
            "support_email",
            "current_version",
            "minimum_version_required",
            "is_version_system_on",
            "ios_is_version_system_on",
            "currency",
            "currency_code",
            "decimal_point",
            "low_stock_limit",
            "app_mode_seller",
            "privacy_policy_delivery_boy",
            "terms_conditions_delivery_boy",
            "google_place_api_key",
            "app_mode_delivery_boy",
            "app_mode_delivery_boy_remark",
            "apiKey",
            "enable_road_path_tracking",
            "broadcast_driver",
            "pusher_app_key",
            "pusher_app_cluster",
            "reverb_app_key",
            "reverb_host",
            "reverb_port",
            "reverb_scheme"
        );
        $settings = CommonHelper::getSettings($variables);
        $settings = CommonHelper::resolveTranslatedSettings($settings);
        $settings["allPermissions"] = auth()->user()->allPermissions;
        $settings["map_provider"] = CommonHelper::activeMapProvider(); // 'google' or 'osm'
        $settings = json_encode($settings);
        $settings = base64_encode($settings);
        if(!empty($settings)){
            return CommonHelper::responseWithData($settings);
        }else{
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getPrivacyPolicy(){
        $variables = array(
            "privacy_policy_delivery_boy",
            "terms_conditions_delivery_boy",
        );
        $settings = CommonHelper::getSettings($variables);
        $settings = CommonHelper::resolveTranslatedSettings($settings);

        if(!empty($settings)){
            return CommonHelper::responseWithData($settings);
        }else{
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function deploy(){
        exec("git pull");
        exec("composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev");
        exec("php artisan migrate");
        echo "Done";
    }

    /**
     * Same reply as customer/live_tracking_route, for the rider app. Rider login only, and
     * only for an order assigned to that rider.
     */
    public function getLiveTrackingRoute(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|numeric|exists:orders,id',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $deliveryBoy = auth()->user()->deliveryBoy ?? null;
        $order = $deliveryBoy
            ? Order::where('id', $request->order_id)->where('delivery_boy_id', $deliveryBoy->id)->first()
            : null;
        if (!$order) {
            return CommonHelper::responseError('Order not found.');
        }

        $payload = LiveTracking::routePayload($order);
        if (!$payload) {
            return CommonHelper::responseError('Live Tracking Not available.');
        }

        return CommonHelper::responseSuccessWithData('Live Tracking Route fetched successfully.', $payload);
    }

    /**
     * Road route from the driver's current position to the order's delivery address.
     * latitude/longitude are the driver's live GPS (falls back to the last stored point).
     */
    public function getOrderRoute(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|numeric|exists:orders,id',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $order = Order::where('id', $request->order_id)
            ->where('delivery_boy_id', auth()->user()->deliveryBoy->id)
            ->first();
        if (!$order) {
            return CommonHelper::responseError('Order not found.');
        }

        $lat = $request->input('latitude');
        $lng = $request->input('longitude');
        if ($lat === null || $lng === null) {
            $tracking = LiveTracking::where('order_id', $order->id)->orderBy('id', 'desc')->first();
            if (!$tracking) {
                return CommonHelper::responseError('Driver location not available.');
            }
            $lat = $tracking->latitude;
            $lng = $tracking->longitude;
        }

        return CommonHelper::responseSuccessWithData('Route fetched successfully.', [
            'driver' => ['latitude' => (float) $lat, 'longitude' => (float) $lng],
            'destination' => ['latitude' => (float) $order->latitude, 'longitude' => (float) $order->longitude],
            'route' => CommonHelper::getRoutePath($lat, $lng, $order->latitude, $order->longitude),
        ]);
    }

    // Auto-assign delivery boy feature disabled
    // /**
    //  * On Duty / Off Duty toggle (auto-assign delivery boy plan §1). Guarded against
    //  * going off-duty mid-delivery - a driver holding an active undelivered order must
    //  * finish it first.
    //  */
    // public function toggleDuty(\Illuminate\Http\Request $request)
    // {
    //     $deliveryBoy = auth()->user()->deliveryBoy ?? null;
    //     if (!$deliveryBoy) {
    //         return CommonHelper::responseError('delivery_boy_not_found');
    //     }

    //     $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
    //         'is_online' => 'required|boolean',
    //         'latitude' => 'nullable|string',
    //         'longitude' => 'nullable|string',
    //     ]);
    //     if ($validator->fails()) {
    //         return CommonHelper::responseError($validator->errors()->first());
    //     }

    //     if (!$request->boolean('is_online') && $deliveryBoy->pending_order_count > 0) {
    //         return CommonHelper::responseError('cannot_go_off_duty_with_active_delivery');
    //     }

    //     $deliveryBoy->is_online = $request->boolean('is_online');
    //     if ($request->boolean('is_online') && $request->filled('latitude') && $request->filled('longitude')) {
    //         $deliveryBoy->current_latitude = $request->latitude;
    //         $deliveryBoy->current_longitude = $request->longitude;
    //         $deliveryBoy->location_updated_at = now();
    //     }
    //     if (!$request->boolean('is_online')) {
    //         $deliveryBoy->current_latitude = null;
    //         $deliveryBoy->current_longitude = null;
    //     }
    //     $deliveryBoy->save();

    //     return CommonHelper::responseSuccess($deliveryBoy->is_online ? 'you_are_now_on_duty' : 'you_are_now_off_duty');
    // }

    /**
     * Periodic location ping while On Duty (auto-assign delivery boy plan §1/§6). Needs no order
     * id: it saves the rider's own position, and for every order the rider has Out For Delivery it
     * records that position for live tracking and pushes it to the customer.
     */
    public function updateLocation(\Illuminate\Http\Request $request)
    {
        $deliveryBoy = auth()->user()->deliveryBoy ?? null;
        if (!$deliveryBoy) {
            return CommonHelper::responseError('delivery_boy_not_found');
        }

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'latitude' => 'required|string',
            'longitude' => 'required|string',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $deliveryBoy->current_latitude = $request->latitude;
        $deliveryBoy->current_longitude = $request->longitude;
        $deliveryBoy->location_updated_at = now();
        $deliveryBoy->save();

        // Push the new position to the customer's live tracking map for every order this
        // driver is currently out for delivery with (status 5). Best-effort: a broadcasting
        // outage must never fail the location update.
        try {
            $orders = Order::where('delivery_boy_id', $deliveryBoy->id)->where('active_status', 5)->get();
            foreach ($orders as $order) {
                // Shared write path (see LiveTracking::record): live_tracking, the rider's own
                // position and the driver_location push all carry this same value.
                LiveTracking::record($order, $deliveryBoy, $request->latitude, $request->longitude);
            }
        } catch (\Throwable $e) {
            Log::error('Driver location tracking update failed: ' . $e->getMessage());
        }

        return CommonHelper::responseSuccess('location_updated_successfully');
    }

    // Auto-assign delivery boy feature disabled
    // /**
    //  * Driver accepts/rejects an auto-assign order offer (plan §6/§7).
    //  */
    // public function respondAssignment(\Illuminate\Http\Request $request)
    // {
    //     $deliveryBoy = auth()->user()->deliveryBoy ?? null;
    //     if (!$deliveryBoy) {
    //         return CommonHelper::responseError('delivery_boy_not_found');
    //     }

    //     $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
    //         'order_id' => 'required|integer',
    //         'action' => 'required|in:accept,reject',
    //     ]);
    //     if ($validator->fails()) {
    //         return CommonHelper::responseError($validator->errors()->first());
    //     }

    //     $attempt = \App\Models\DeliveryAssignmentAttempt::where('order_id', $request->order_id)
    //         ->where('delivery_boy_id', $deliveryBoy->id)
    //         ->where('status', \App\Models\DeliveryAssignmentAttempt::$statusOffered)
    //         ->first();

    //     if (!$attempt) {
    //         return CommonHelper::responseError('offer_no_longer_available');
    //     }

    //     $result = \App\Services\AutoAssignDeliveryBoyService::handleResponse($attempt->id, $request->action);

    //     return $result['status'] === 1
    //         ? CommonHelper::responseSuccess($result['message'])
    //         : CommonHelper::responseError($result['message']);
    // }

    // Auto-assign delivery boy feature disabled
    // /**
    //  * Polled by the web delivery-boy panel (VerticalHeader.vue) every few seconds while
    //  * On Duty, to show the incoming-offer popup. No websocket/push dependency - works
    //  * the same on shared hosting as a VPS. Returns null when there's nothing open.
    //  */
    // public function currentOffer()
    // {
    //     $deliveryBoy = auth()->user()->deliveryBoy ?? null;
    //     if (!$deliveryBoy) {
    //         return CommonHelper::responseError('delivery_boy_not_found');
    //     }

    //     // Expire timed-out offers and start the next round without waiting for the cron job.
    //     \App\Services\AutoAssignDeliveryBoyService::sweepIfDue();

    //     // Newest offer that is still open: skip offers past their time limit (the timeout sweep
    //     // may not have marked them yet) and orders someone else already took.
    //     $attempt = null;
    //     $order = null;
    //     $settings = null;
    //     $openAttempts = \App\Models\DeliveryAssignmentAttempt::where('delivery_boy_id', $deliveryBoy->id)
    //         ->where('status', \App\Models\DeliveryAssignmentAttempt::$statusOffered)
    //         ->orderByDesc('offered_at')
    //         ->get();
    //     foreach ($openAttempts as $candidate) {
    //         $candidateOrder = Order::find($candidate->order_id);
    //         if (!$candidateOrder || !empty($candidateOrder->delivery_boy_id)) {
    //             continue;
    //         }
    //         $candidateSettings = \App\Models\ModuleDeliverySetting::forModule($candidateOrder->module_id);
    //         $timeout = (int) ($candidateSettings->response_timeout_seconds ?? 60);
    //         if ($candidate->offered_at && $candidate->offered_at->copy()->addSeconds($timeout)->isPast()) {
    //             continue;
    //         }
    //         $attempt = $candidate;
    //         $order = $candidateOrder;
    //         $settings = $candidateSettings;
    //         break;
    //     }

    //     if (!$attempt) {
    //         return CommonHelper::responseWithData(null);
    //     }

    //     $itemCount = OrderItem::where('order_id', $order->id)->count();
    //     $address = $order->address_id ? \App\Models\UserAddress::find($order->address_id) : null;

    //     return CommonHelper::responseWithData([
    //         'attempt_id' => $attempt->id,
    //         'order_id' => $order->id,
    //         'final_total' => $order->final_total,
    //         'item_count' => $itemCount,
    //         'area' => $address->area ?? '',
    //         'city' => $address->city ?? '',
    //         'distance_km' => $attempt->distance_km,
    //         'offered_at' => optional($attempt->offered_at)->toIso8601String(),
    //         'response_timeout_seconds' => $settings->response_timeout_seconds ?? 60,
    //     ]);
    // }

    // Auto-assign delivery boy feature disabled
    // /**
    //  * Requested Orders queue: every order currently offered to this delivery boy that has not
    //  * expired, so an offer that was missed as a popup / push can still be accepted or rejected
    //  * from here. Offers come from the existing delivery_assignment_attempts rows.
    //  */
    // public function requestedOrders()
    // {
    //     $deliveryBoy = auth()->user()->deliveryBoy ?? null;
    //     if (!$deliveryBoy) {
    //         return CommonHelper::responseError('delivery_boy_not_found');
    //     }

    //     // The table only exists where the auto-assign tables were migrated.
    //     if (!\Illuminate\Support\Facades\Schema::hasTable('delivery_assignment_attempts')) {
    //         return CommonHelper::responseWithData([]);
    //     }

    //     // Expire timed-out offers and start the next round without waiting for the cron job.
    //     \App\Services\AutoAssignDeliveryBoyService::sweepIfDue();

    //     $attempts = \App\Models\DeliveryAssignmentAttempt::where('delivery_boy_id', $deliveryBoy->id)
    //         ->where('status', \App\Models\DeliveryAssignmentAttempt::$statusOffered)
    //         ->orderBy('offered_at')
    //         ->get();
    //     if ($attempts->isEmpty()) {
    //         return CommonHelper::responseWithData([]);
    //     }

    //     $orders = Order::withoutGlobalScope('module')->whereIn('id', $attempts->pluck('order_id'))->get()->keyBy('id');
    //     $itemCounts = OrderItem::whereIn('order_id', $orders->keys())
    //         ->selectRaw('order_id, COUNT(*) as total')->groupBy('order_id')->pluck('total', 'order_id');
    //     $addresses = \App\Models\UserAddress::whereIn('id', $orders->pluck('address_id')->filter()->unique())->get()->keyBy('id');

    //     $timeouts = [];
    //     $queue = [];
    //     foreach ($attempts as $attempt) {
    //         $order = $orders->get($attempt->order_id);
    //         // Gone, cancelled out of the offer stage, or already taken by someone else.
    //         if (!$order || !empty($order->delivery_boy_id)) {
    //             continue;
    //         }
    //         if (!isset($timeouts[$order->module_id])) {
    //             $settings = \App\Models\ModuleDeliverySetting::forModule($order->module_id);
    //             $timeouts[$order->module_id] = (int) ($settings->response_timeout_seconds ?? 60);
    //         }
    //         $timeout = $timeouts[$order->module_id];
    //         $expiresAt = $attempt->offered_at ? $attempt->offered_at->copy()->addSeconds($timeout) : null;
    //         if ($expiresAt && $expiresAt->isPast()) {
    //             continue;
    //         }
    //         $address = $addresses->get($order->address_id);
    //         $queue[] = [
    //             'attempt_id' => $attempt->id,
    //             'order_id' => $order->id,
    //             'final_total' => $order->final_total,
    //             'item_count' => (int) ($itemCounts[$order->id] ?? 0),
    //             'area' => $address->area ?? '',
    //             'city' => $address->city ?? '',
    //             'distance_km' => $attempt->distance_km,
    //             'offered_at' => optional($attempt->offered_at)->toIso8601String(),
    //             'expires_at' => optional($expiresAt)->toIso8601String(),
    //             'seconds_left' => $expiresAt ? (int) max(0, now()->diffInSeconds($expiresAt, false)) : null,
    //             'response_timeout_seconds' => $timeout,
    //         ];
    //     }

    //     return CommonHelper::responseWithData($queue);
    // }

    // Auto-assign delivery boy feature disabled
    // /**
    //  * Accept / reject one order from the Requested Orders queue.
    //  */
    // public function respondRequestedOrder(\Illuminate\Http\Request $request)
    // {
    //     $deliveryBoy = auth()->user()->deliveryBoy ?? null;
    //     if (!$deliveryBoy) {
    //         return CommonHelper::responseError('delivery_boy_not_found');
    //     }

    //     $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
    //         'order_id' => 'required|integer',
    //         'action' => 'required|in:accept,reject',
    //     ]);
    //     if ($validator->fails()) {
    //         return CommonHelper::responseError($validator->errors()->first());
    //     }

    //     if (!\Illuminate\Support\Facades\Schema::hasTable('delivery_assignment_attempts')) {
    //         return CommonHelper::responseError('offer_no_longer_available');
    //     }

    //     $attempt = \App\Models\DeliveryAssignmentAttempt::where('order_id', $request->order_id)
    //         ->where('delivery_boy_id', $deliveryBoy->id)
    //         ->where('status', \App\Models\DeliveryAssignmentAttempt::$statusOffered)
    //         ->first();
    //     if (!$attempt) {
    //         return CommonHelper::responseError('offer_no_longer_available');
    //     }

    //     $order = Order::withoutGlobalScope('module')->find($attempt->order_id);
    //     $settings = $order ? \App\Models\ModuleDeliverySetting::forModule($order->module_id) : null;
    //     $timeout = (int) ($settings->response_timeout_seconds ?? 60);
    //     if ($attempt->offered_at && $attempt->offered_at->copy()->addSeconds($timeout)->isPast()) {
    //         return CommonHelper::responseError('offer_expired');
    //     }

    //     $result = \App\Services\AutoAssignDeliveryBoyService::handleResponse($attempt->id, $request->action);

    //     return $result['status'] === 1
    //         ? CommonHelper::responseSuccess($result['message'])
    //         : CommonHelper::responseError($result['message']);
    // }
}
