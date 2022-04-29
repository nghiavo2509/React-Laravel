<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;
    protected $table = 'lib_genres';
    protected $fillable = ['title', 'category_id', 'status'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
