<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'lib_products';
    protected $fillable = ['title', 'category_id', 'genre_id', 'quantity', 'status'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
