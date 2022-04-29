<?php

namespace App\Http\Resources\User\Student;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
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
            'student_code' => $this->student_code,
            'name' => $this->name,
            'user_id' => $this->user_id,
            'phone' => $this->phone,
        ];
    }
}
