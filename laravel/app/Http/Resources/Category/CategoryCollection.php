<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoryCollection extends ResourceCollection
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
            'categories' => $this->collection->transform(function ($page) {
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'count_genre' => count($page->genre),
                    'status' => $page->status,
                ];
            }),
        ];
    }
}
