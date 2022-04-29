<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Http\Resources\Product\ProductCollection;
use App\Http\Resources\Product\ProductResource;
use App\Http\Services\Product\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;
    public function __construct(ProductService $product)
    {
        $this->productService = $product;
    }
    public function index()
    {
        $products = $this->productService->get();
        $items = new ProductCollection(ProductResource::collection($products));
        return response()->json($items);
    }

    public function get(Request $request)
    {
        if ($request->has('status')) {
            $products = $this->productService->get($request->status);
            $items = new ProductCollection(ProductResource::collection($products));
        }
        return response()->json($items);
    }

    public function store(StoreRequest $request)
    {
        $message = 'Thêm sản phẩm thành công';
        $validProduct = $this->productService->insert($request);
        return response()->json([
            'VALID' => $validProduct,
            'TN' => $message
        ]);
    }

    public function edit($id)
    {
        $product = $this->productService->find($id);
        $items = new ProductResource($product);
        return response()->json($items);
    }

    public function update(UpdateRequest $request, $id)
    {
        $message = 'Đã có lỗi xảy ra!';
        $valid = $this->productService->update($request, $id);
        if ($valid) {
            $message = 'Update Thành công!';
            return response()->json(
                [
                    'VALID' => $valid,
                    'TN' => $message,
                ]
            );
        }
        return response()->json(
            [
                'VALID' => $valid,
                'TN' => $message,
            ]
        );
    }

    public function destroy($id)
    {
        $message = 'Đã có lỗi xảy ra!';

        $valid = $this->productService->destroy($id);
        if ($valid) {
            $message = 'Xóa Thành công!';
            return response()->json(
                [
                    'VALID' => $valid,
                    'TN' => $message,
                ]
            );
        }
        return response()->json(
            [
                'VALID' => $valid,
                'TN' => $message,
            ]
        );
    }

    public function status($id)
    {
        $valid = $this->productService->status($id);
        return response()->json([
            'VALID' => $valid
        ]);
    }
}
