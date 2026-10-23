<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartsApiController extends Controller
{
    /**
     * Seller panel: abandoned carts for this seller's own products only.
     */
    public function getSellerCarts(Request $request)
    {
        $seller = auth()->user()->seller ?? null;
        if (!$seller) {
            return CommonHelper::responseError('Seller not found');
        }
        return $this->listCarts($request, $seller->id);
    }

    private function listCarts(Request $request, $sellerId = null)
    {
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $query = Cart::select(
            'carts.id',
            'carts.qty',
            'carts.created_at',
            // The Cart image_url accessor looks the picture up from these two ids - without them
            // it finds nothing and image_url comes back empty. They are removed from the reply below.
            'carts.product_id',
            'carts.product_variant_id',
            'products.image as image', // the product's main picture, tried first by the accessor
            'users.name as user_name',
            'products.name as product_name',
            'product_variants.measurement',
            'units.short_code as unit_code',
            'sellers.name as store_name',
            'modules.name as channel_name'
        )
        ->leftJoin('users', 'carts.user_id', '=', 'users.id')
        ->leftJoin('products', 'carts.product_id', '=', 'products.id')
        ->leftJoin('product_variants', 'carts.product_variant_id', '=', 'product_variants.id')
        ->leftJoin('attribute_values as units', 'product_variants.stock_unit_id', '=', 'units.id')
        ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
        ->leftJoin('modules', 'products.module_id', '=', 'modules.id')
        ->when(request()->header('X-Module-Id'), function ($q, $moduleId) {
            $q->where('products.module_id', $moduleId);
        })
        ->when($sellerId, function ($q, $sellerId) {
            $q->where('products.seller_id', $sellerId);
        });

        if ($request->has('search') && $request->input('search') != '') {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('users.name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('products.name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('sellers.name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('modules.name', 'like', '%' . $searchTerm . '%');
            });
        }

        if ($request->has('sort_by') && $request->input('sort_by') != '') {
            $sortColumn = $request->input('sort_by', 'carts.id');
            $sortDirection = $request->input('sort_dir', 'desc');
            
            // Map frontend sort keys to database columns
            if ($sortColumn == 'id') {
                $sortColumn = 'carts.id';
            } elseif ($sortColumn == 'user_name') {
                $sortColumn = 'users.name';
            } elseif ($sortColumn == 'product_name') {
                $sortColumn = 'products.name';
            } elseif ($sortColumn == 'store_name') {
                $sortColumn = 'sellers.name';
            } elseif ($sortColumn == 'channel_name') {
                $sortColumn = 'modules.name';
            } elseif ($sortColumn == 'qty') {
                $sortColumn = 'carts.qty';
            } elseif ($sortColumn == 'created_at') {
                $sortColumn = 'carts.created_at';
            }
            
            $query->orderBy($sortColumn, $sortDirection);
        } else {
            $query->orderBy('carts.id', 'desc');
        }

        $total = $query->count();
        $carts = $query->skip($offset)->take($limit)->get();

        $cartsForResponse = $carts->map(function ($cart) {
            $row = $cart->toArray();
            unset($row['product_id'], $row['product_variant_id'], $row['image']); // used only for image_url, keeps the reply shape unchanged
            $row['variant_name'] = $cart->measurement . ' ' . $cart->unit_code;
            
            $rawCreated = $cart->getAttributes()['created_at'] ?? null;
            if ($rawCreated !== null && $rawCreated !== '') {
                $row['created_at'] = CommonHelper::formatDateTime($rawCreated);
            }
            return $row;
        });

        return CommonHelper::responseWithData($cartsForResponse, $total);
    }

    public function sellerDeleteCart($id)
    {
        $seller = auth()->user()->seller ?? null;
        if (!$seller) {
            return CommonHelper::responseError('Seller not found');
        }

        $cart = Cart::select('carts.*')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->where('carts.id', $id)
            ->where('products.seller_id', $seller->id)
            ->first();

        if ($cart) {
            $cart->delete();
            return CommonHelper::responseSuccess("Cart Item Deleted Successfully!");
        }
        return CommonHelper::responseError("Cart Item Not Found");
    }
}
