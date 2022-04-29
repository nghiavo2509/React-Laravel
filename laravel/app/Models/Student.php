<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = 'user_students';
    protected $fillable = [
        'name',
        'phone',
        'student_code',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
