<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'discount_percentage',
        'is_used',
        'expiry_date'
    ];

    protected $casts = [
        'is_used' => 'boolean',
        'expiry_date' => 'datetime'
    ];

    public function isValid()
    {
        return !$this->is_used && $this->expiry_date->isFuture();
    }
}
