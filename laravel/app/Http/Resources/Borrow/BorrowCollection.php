<?php

namespace App\Http\Resources\Borrow;

use Illuminate\Http\Resources\Json\ResourceCollection;

class BorrowCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);return [
        return [
            'borrows' => $this->collection->transform(function ($page) {
                return [
                    'id' => $page->id,
                    'user_code' => $page->user_code,
                    'quantity' => $page->quantity,
                    'product_id' => $page->product->title,
                    'staff_id' => $page->staff_id,
                    'status' => $page->status,
                ];
            }),
        ];
    }
}
