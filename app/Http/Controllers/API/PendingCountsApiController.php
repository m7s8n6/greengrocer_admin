<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\DeliveryBoy;
use App\Models\Seller;
use App\Models\UserProductRequest;
use Illuminate\Support\Facades\DB;

/**
 * Counts of items waiting for an admin decision - drives the red dots in the admin sidebar.
 */
class PendingCountsApiController extends Controller
{
    public function index()
    {
        $moduleId = request()->header('X-Module-Id') ?: 1;

        // Same scope as the Approve Requests list (ProductApisController::getProducts): the active
        // module only, and only products that still have a seller and at least one variant - so
        // the dot is never lit when that page is empty.
        $productApprovals = DB::table('products as p')
            ->join('sellers as s', 'p.seller_id', '=', 's.id')
            ->where('p.module_id', $moduleId)
            ->where('p.is_approved', 0)
            ->whereNull('p.deleted_at')
            ->whereExists(function ($q) {
                $q->select(DB::raw(1))
                    ->from('product_variants as pv')
                    ->whereColumn('pv.product_id', 'p.id')
                    ->whereNull('pv.deleted_at');
            })
            ->count('p.id');

        return CommonHelper::responseWithData([
            'seller_requests' => Seller::where('status', Seller::$statusRegistered)->count(),
            'delivery_boy_requests' => DeliveryBoy::where('status', DeliveryBoy::$statusRegistered)->count(),
            'product_approvals' => $productApprovals,
            'product_requests' => UserProductRequest::where('status', UserProductRequest::STATUS_PENDING)->count(),
        ]);
    }
}
