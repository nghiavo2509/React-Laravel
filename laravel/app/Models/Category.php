<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'lib_categories';

    protected $fillable = ['title', 'status'];


    public function genre()
    {
        return $this->hasMany(Genre::class);
    }
}
