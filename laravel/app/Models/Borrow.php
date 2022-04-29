<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Borrow extends Model
{
    use HasFactory;

    protected $table = 'lib_info_borrows';
    protected $fillable = [
        'id', 'user_code', 'quantity', 'product_id', 'staff_id', 'status'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
