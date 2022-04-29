<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;
use App\Http\Resources\Category\CategoryCollection;
use App\Http\Resources\Category\CategoryResource;
use App\Http\Services\Category\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $category)
    {
        $this->categoryService = $category;
    }

    public function index()
    {
        $categories = $this->categoryService->get();
        return response()->json(
            new CategoryCollection(CategoryResource::collection($categories))
        );
        return response()->json([
            'categories' => $categories
        ]);
    }

    public function get(Request $request)
    {
        if ($request->has('status')) {
            $categories = $this->categoryService->get($request->status);
            $items = new CategoryCollection(CategoryResource::collection($categories));
        } else if ($request->has('category_id')) {
            $genre = $this->categoryService->find($request->post('category_id'));
            $items['genres'] = $genre->genre;
        }
        return response()->json(
            $items
        );
    }

    public function store(StoreRequest $request)
    {
        $valid = false;
        $message = '';
        $category = $this->categoryService->insert($request);
        if ($category) {
            $valid = true;
            $message = 'Thêm sản phẩm thành công';
            return response()->json([
                'VALID' => $valid,
                'TN' => $message
            ]);
        }
        return response()->json([
            'VALID' => $valid,
            'TN' => $message
        ]);
    }

    public function edit($id)
    {
        $category = $this->categoryService->find($id);

        if ($category) {
            return response()->json([
                'category' => new CategoryResource($category),
                'status' => 200
            ]);
        }
        return response()->json([
            'status' => 404
        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $message = 'Đã xảy ra lỗi';
        $valid = $this->categoryService->update($request, $id);
        if ($valid) {
            $message = 'Update Thành công';
        }
        return response()->json([
            'VALID' => $valid,
            'TN' => $message
        ]);
    }

    public function status($id)
    {
        $status = $this->categoryService->status($id);
        return response()->json([
            'VALID' => $status
        ]);
    }

    public function getObject(Request $request)
    {
        $category = $this->categoryService->getObject($request);
        return response()->json([
            'object' => $category
        ]);
    }

    public function destroy($id)
    {
        $validDestroy = $this->categoryService->destroy($id);
        return response()->json([
            'VALID' => $validDestroy
        ]);
    }
}
