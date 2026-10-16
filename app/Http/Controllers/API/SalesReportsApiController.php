<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\OrderStatusList;
use App\Models\Seller;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\DeliveryBoy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class SalesReportsApiController extends Controller
{
    public function getSalesReport(Request $request){
        $moduleId = request()->header('X-Module-Id') ?: 1;

        $startDate = $request->filled('startDate') ? Carbon::parse($request->input('startDate'))->startOfDay() : null;
        $endDate = $request->filled('endDate') ? Carbon::parse($request->input('endDate'))->endOfDay() : null;

        $sellers = Seller::where('module_id', $moduleId)->orderBy('id','DESC')->get()->makeHidden(['translations'])->toArray();
        
        $categories = Category::where('module_id', $moduleId)->orderBy('id','DESC')
            ->get()
            ->makeHidden(['has_child', 'has_active_child', 'translations'])
            ->toArray();
        
        $deliveryBoys = DeliveryBoy::orderBy('id','DESC')->get()->makeHidden(['translations'])->toArray();

        $SalesReports = OrderItem::select(
                'order_items.id',
                'orders.total',
                'order_items.seller_id',
                'order_items.sub_total',
                'order_items.price',
                'order_items.discounted_price',
                'order_items.quantity',
                'orders.user_id',
                'orders.mobile',
                'products.name as product_name',
                'orders.final_total',
                'orders.address',
                'users.name as user_name',
                'order_items.status',
                'product_variants.purchase_price',
                DB::raw('DATE_FORMAT(order_items.created_at,"%d-%m-%Y") as added_date')
            )
            ->leftJoin('users', 'order_items.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->where(function ($query) {
                $query->where('orders.active_status', OrderStatusList::$delivered)
                    ->orWhere('orders.active_status', OrderStatusList::$selfPickupPicked);
            })
            ->where('products.module_id', $moduleId);

        if ($startDate && $endDate) {
            $SalesReports = $SalesReports->whereBetween('order_items.created_at', [$startDate, $endDate]);
        }

        if(isset($request->seller) && $request->seller != ""){
            $SalesReports = $SalesReports->where('order_items.seller_id', $request->seller);
        }

        if(isset($request->category) && $request->category != ""){
            $SalesReports = $SalesReports->where('products.category_id', $request->category);
        }
        if(isset($request->deliveryBoy) && $request->deliveryBoy != ""){
            $SalesReports = $SalesReports->where('orders.delivery_boy_id', $request->deliveryBoy);
        }
        if(isset($request->payment_type) && $request->payment_type != ""  ){
            if($request->payment_type == "1")
            $SalesReports = $SalesReports->where('orders.payment_method', "COD");
        else{
            $SalesReports = $SalesReports->where('orders.payment_method','!=', "COD");
        }
        }

        $SalesReports = $SalesReports->orderBy('order_items.id','DESC')->get();
        $SalesReports = $SalesReports->map(function (OrderItem $oi) {
            $row = $oi->toArray();
            $rawAddedDate = $oi->getAttributes()['added_date'] ?? null;
            if ($rawAddedDate !== null && $rawAddedDate !== '') {
                $row['added_date'] = CommonHelper::formatDate($rawAddedDate);
            }

            // Margin / profit calculation
            $sell_price    = (float)($oi->discounted_price > 0 ? $oi->discounted_price : $oi->price);
            $cost_price    = (float)($oi->purchase_price ?? 0);
            $qty           = (int)($oi->quantity ?? 1);
            $cost_total    = round($cost_price * $qty, 2);
            $margin_amount = round(($sell_price - $cost_price) * $qty, 2);
            $margin_pct    = $sell_price > 0
                ? round((($sell_price - $cost_price) / $sell_price) * 100, 2)
                : 0;

            $row['cost_price']    = $cost_price;
            $row['cost_total']    = $cost_total;
            $row['margin_amount'] = $margin_amount;
            $row['margin_pct']    = $margin_pct;

            return $row;
        });

        // Summary totals
        $total_revenue = $SalesReports->sum('sub_total');
        $total_cost    = $SalesReports->sum('cost_total');
        $total_margin  = $SalesReports->sum('margin_amount');
        $overall_margin_pct = $total_revenue > 0
            ? round(($total_margin / $total_revenue) * 100, 2)
            : 0;

        $data = array(
            "sellers"            => $sellers,
            "categories"         => $categories,
            "deliveryBoys"       => $deliveryBoys,
            "salesReports"       => $SalesReports,
            "total_revenue"      => round($total_revenue, 2),
            "total_cost"         => round($total_cost, 2),
            "total_margin"       => round($total_margin, 2),
            "overall_margin_pct" => $overall_margin_pct,
        );
        return CommonHelper::responseWithData($data);

    }
    
    public function excelSalesReport(Request $request){
        $moduleId = request()->header('X-Module-Id') ?: 1;
        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
    
        $sellers = Seller::where('module_id', $moduleId)->orderBy('id','DESC')->get()->toArray();
        $categories = Category::where('module_id', $moduleId)->orderBy('id','DESC')->get()->toArray();
    
        $SalesReports = OrderItem::select('order_items.id','orders.total',
            'order_items.seller_id','order_items.sub_total','orders.user_id','orders.mobile',
            'products.name as product_name','orders.final_total','orders.address',
            'users.name as user_name','order_items.status',
    
            DB::raw('DATE_FORMAT(order_items.created_at,"%d-%m-%Y") as added_date'))
            ->leftJoin('users', 'order_items.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->where(function ($query) {
                $query->where('orders.active_status', OrderStatusList::$delivered)
                    ->orWhere('orders.active_status', OrderStatusList::$selfPickupPicked);
            })
            ->where('products.module_id', $moduleId);

        if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != "") {
            $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
            $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
            $SalesReports = $SalesReports->whereBetween('order_items.created_at', [$startDate, $endDate]);
        }
    
        if(isset($request->seller) && $request->seller != ""){
            $SalesReports = $SalesReports->where('order_items.seller_id', $request->seller);
        }
    
        if(isset($request->category) && $request->category != ""){
            $SalesReports = $SalesReports->where('products.category_id', $request->category);
        }
    
        $SalesReports = $SalesReports->orderBy('order_items.id','DESC')->get();
    
        // Generate CSV content
        $csvData = [];
        $csvData[] = ['Product Name', 'Total']; // Add headers
        foreach ($SalesReports as $row) {
            $csvData[] = [$row->product_name, $row->total]; // Add data
        }
    
        // Generate CSV file
        $csvFileName = 'export_' . Str::random(10) . '.csv';
        $csvFile = fopen('php://temp', 'w');
        foreach ($csvData as $csvRow) {
            fputcsv($csvFile, $csvRow);
        }
        rewind($csvFile);
        $csvContent = stream_get_contents($csvFile);
        fclose($csvFile);
    
        // Return the file as a downloadable response
        return response()->streamDownload(function () use ($csvContent) {
            echo $csvContent;
        }, $csvFileName);
    }
}
