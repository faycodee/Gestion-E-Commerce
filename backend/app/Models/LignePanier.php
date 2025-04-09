<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LignePanier extends Model
{
    use HasFactory;

    protected $table = 'ligne_panier';

    protected $fillable = [
        'quantite',
        'prix_unitaire',
        'id_produit',
        'id_panier',
    ];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }

    public function panier()
    {
        return $this->belongsTo(Panier::class, 'id_panier');
    }
}