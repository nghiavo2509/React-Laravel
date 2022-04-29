<?php

namespace App\Http\Services\Product;

use App\Models\Product;

class ProductService
{
    public function get($status = false)
    {
        if ($status) {
            return Product::where('status', 1)->get();
        }
        return Product::all();
    }

    public function find($id)
    {
        return Product::find($id);
    }

    public function handleBorrowBook($product, int $qty)
    {
        if ($product) {
            if ($qty <= $product->quantity) {
                $qtyNew = $product->quantity - $qty;
                $product->update([
                    'quantity' => $qtyNew
                ]);
                return true;
            }
        }
        return false;
    }
    public function insert($request)
    {
        $values = $request->post();
        Product::create([
            'title' => $values['title'],
            'quantity' => $values['quantity'],
            'category_id' => $values['category_id'],
            'genre_id' => $values['genre_id'],
            'status' => $values['status'],
        ]);
        return true;
    }

    public function update($request, $id)
    {
        $values = $request->post();
        $product = Product::find($id);
        if ($product) {
            $product->update([
                'title' => $values['title'],
                'quantity' => $values['quantity'],
                'category_id' => $values['category_id'],
                'genre_id' => $values['genre_id'],
                'status' => $values['status'],
            ]);
            return true;
        }
        return false;
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return true;
        }
        return false;
    }

    public function status($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->update([
                'status' => !$product->status
            ]);
            return true;
        }
        return false;
    }
}
