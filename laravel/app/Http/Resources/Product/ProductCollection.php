<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'products' => $this->collection->transform(function ($page) {
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'quantity' => $page->quantity,
                    'category_title' => $page->category->title,
                    'genre_id' => $page->genre_id,
                    'status' => $page->status,
                ];
            }),
        ];
    }
}
