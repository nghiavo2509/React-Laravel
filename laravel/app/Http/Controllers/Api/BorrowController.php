<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Borrow\StoreRequest;
use App\Http\Requests\Borrow\UpdateRequest;
use App\Http\Resources\Borrow\BorrowCollection;
use App\Http\Resources\Borrow\BorrowResource;
use App\Http\Services\Borrow\BorrowService;
use App\Http\Services\Product\ProductService;
use App\Models\Product;
use Illuminate\Http\Request;

class BorrowController extends Controller
{
    protected $borrowService;
    protected $productService;

    public function __construct(BorrowService $borrow, ProductService $product)
    {
        $this->borrowService = $borrow;
        $this->productService = $product;
    }

    public function index()
    {
        $data = $this->borrowService->getAll();
        $items = new BorrowCollection(BorrowResource::collection($data));
        return response()->json($items);
    }

    public function edit($id)
    {
        $borrow = $this->borrowService->find($id);
        $item = new BorrowResource($borrow);
        return response()->json($item);
    }

    public function update(UpdateRequest $request, $id)
    {
        $message = 'Kiểm tra lại tên sách';
        $valid = false;
        $product = Product::where('title', $request->post('product_name'))->first();
        if ($request->quantity == 0) {
            $message = 'Số lượng không hợp lệ';
            return response()->json([
                'VALID' => $valid,
                'TN' => $message,
            ]);
        }
        if ($product) {
            $qty = $request->quantity;
            $handleQty = $this->productService->handleBorrowBook($product, $qty);
            if ($handleQty != true) {
                $message = 'Kho không đủ số lượng sách yêu cầu';
                return response()->json([
                    'VALID' => false,
                    'TN' => $message,
                ]);
            }
            $request['product_id'] = $product->id;
            $valid = $this->borrowService->update($request, $id);
            $message = 'Update Thành công';
        }
        return response()->json([
            'VALID' => $valid,
            'TN' => $message
        ]);
    }

    public function store(StoreRequest $request)
    {
        $message = 'Đã có lỗi xảy ra!';
        $valid = false;
        $product = Product::where('title', $request->post('product_name'))->first();
        $qty = $request->quantity;
        if ($request->quantity == 0) {
            $message = 'Số lượng không hợp lệ';
            return response()->json([
                'VALID' => $valid,
                'TN' => $message,
            ]);
        }
        if ($product) {
            $handleQty = $this->productService->handleBorrowBook($product, $qty);
            if ($handleQty != true) {
                $message = 'Kho không đủ số lượng sách yêu cầu';
                return response()->json([
                    'VALID' => false,
                    'TN' => $message,
                ]);
            }
            $request['product_id'] = $product->id;
            $valid = $this->borrowService->insert($request);
            $message = 'Thêm mới thành công!';
        } else {
            $message = 'Kiểm tra lại tên sách';
            return response()->json([
                'VALID' => $valid,
                'TN' => $message
            ]);
        }

        return response()->json([
            'VALID' => $valid,
            'TN' => $message,
        ]);
    }
}
