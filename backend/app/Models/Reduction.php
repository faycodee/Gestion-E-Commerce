<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reduction extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'pourcentage_reduction',
        'periode_reduction',
    ];

    public $timestamps = true;
}