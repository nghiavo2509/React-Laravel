<?php

namespace App\Http\Services\Category;

use App\Models\Category;

class CategoryService
{

    public function get($status = false)
    {
        if ($status) {
            return Category::where('status', 1)->get();
        }
        return Category::all();
    }

    public function insert($request)
    {
        $values = $request->post();
        Category::create([
            'title' => $values['title'],
            'status' => $values['status'],
        ]);
        return true;
    }

    public function find($id)
    {
        return Category::find($id);
    }

    public function update($request, $id)
    {
        $values = $request->post();
        $category = Category::find($id);
        if ($category) {
            $category->update([
                'title' => $values['title'],
                'status' => $values['status'],
            ]);
            return true;
        }
        return false;
    }
    public function status($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->update([
                'status' => !$category->status
            ]);
            return true;
        }
        return false;
    }

    public function getObject($request)
    {

        $values = $request->post();
        $category = Category::select($values['select'])->where([
            'id' => $values['id'],
        ])->first();
        if ($category) {
            return $category;
        }
        return false;
    }
    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->delete();
            return true;
        }
        return false;
    }
}
