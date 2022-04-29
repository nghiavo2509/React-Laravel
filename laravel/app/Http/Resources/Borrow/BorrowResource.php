<?php

namespace App\Http\Resources\Borrow;

use Illuminate\Http\Resources\Json\JsonResource;

class BorrowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'user_code' => $this->user_code,
            'quantity' => $this->quantity,
            'product_id' => $this->product_id,
            'product_name' => $this->product->title,
            'staff_id' => $this->staff_id,
            'status' => $this->status,
        ];
    }
}
