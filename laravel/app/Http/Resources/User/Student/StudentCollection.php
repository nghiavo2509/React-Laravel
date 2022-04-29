<?php

namespace App\Http\Resources\User\Student;

use Illuminate\Http\Resources\Json\ResourceCollection;

class StudentCollection extends ResourceCollection
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
            'students' => $this->collection->transform(function ($page) {
                return [
                    'id' => $page->id,
                    'student_code' => $page->student_code,
                    'name' => $page->name,
                    // 'user_obj' => $page->user,
                    'user_id' => $page->user_id,
                    'phone' => $page->phone,
                ];
            }),
        ];
    }
}
