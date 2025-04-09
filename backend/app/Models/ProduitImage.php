<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduitImage extends Model
{
    use HasFactory;

    protected $table = 'produit_image';

    protected $fillable = [
        'nom',
        'url',
        'id_produit',
    ];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }
}