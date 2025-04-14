<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TVA extends Model
{
    use HasFactory;

    protected $table = 'tvas';

    protected $fillable = [
        'nom',
        'periode_TVA',
        'taux',
    ];

    public function produits()
    {
        return $this->hasMany(Produit::class);
    }
}