<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneLivraison extends Model
{
    use HasFactory;

    protected $table = 'ligne_livraison';

    protected $fillable = [
        'id_produit',
        'id_livraison',
        'quantite',
    ];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }

    public function livraison()
    {
        return $this->belongsTo(Livraison::class, 'id_livraison');
    }
}