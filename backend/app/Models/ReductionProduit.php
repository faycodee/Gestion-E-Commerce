<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReductionProduit extends Model
{
    use HasFactory;

    protected $table = 'reduction_produit';

    protected $fillable = [
        'produit_id',
    ];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function reduction()
    {
        return $this->belongsTo(Reduction::class);
    }
}