<?php

namespace App\Http\Resources\Genre;

use Illuminate\Http\Resources\Json\ResourceCollection;

class GenreCollection extends ResourceCollection
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
            'genres' => $this->collection->transform(function ($page) {
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'category_title' => $page->category->title,
                    'status' => $page->status,
                ];
            }),
        ];
    }
}
