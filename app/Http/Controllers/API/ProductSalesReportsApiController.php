<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\OrderStatusList;
use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;

class ProductSalesReportsApiController extends Controller
{
    public function getProductSalesReport(Request $request){ 
        $moduleId = request()->header('X-Module-Id') ?: 1;
        $ProductSalesReports = OrderItem::select('product_variants.product_id','products.name as product_name',
            'sellers.name as seller_name','product_variants.measurement',
            DB::raw('(SELECT short_code FROM attribute_values WHERE attribute_values.attribute_id = product_variants.stock_unit_id LIMIT 1) AS unit_name'),
            'order_items.*','orders.active_status as order_active_status',
            'variant_totals.total_sales',
            'variant_totals.total_price'
        )
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            // Per-variant totals are computed once here. They used to be two correlated
            // subqueries in the select list, re-run over order_items for every joined row.
            ->leftJoinSub(
                DB::table('order_items')
                    ->select('product_variant_id')
                    ->selectRaw('SUM(CASE WHEN active_status IN (?, ?) THEN quantity END) as total_sales', [OrderStatusList::$delivered, OrderStatusList::$selfPickupPicked])
                    ->selectRaw('SUM(sub_total) as total_price')
                    ->groupBy('product_variant_id'),
                'variant_totals',
                'variant_totals.product_variant_id',
                '=',
                'product_variants.id'
            )
            ->where(function($query) {
                $query->where('orders.active_status', OrderStatusList::$delivered)
                      ->orWhere('orders.active_status', OrderStatusList::$selfPickupPicked);
            })
            ->where('products.module_id', $moduleId);
            
            if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != ""){
                $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
                $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
                $ProductSalesReports = $ProductSalesReports->whereBetween('order_items.created_at', [$startDate, $endDate]);
            }

        $ProductSalesReports = $ProductSalesReports->orderBy('order_items.id','DESC')
            ->groupBy('product_variants.id')
           ->get();
        return CommonHelper::responseWithData($ProductSalesReports);

    }
}
