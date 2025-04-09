<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneFacture extends Model
{
    use HasFactory;

    protected $table = 'ligne_facture';

    protected $fillable = [
        'quantite',
        'prix_unitaire',
        'id_facture',
        'id_produit',
    ];

    public function facture()
    {
        return $this->belongsTo(Facture::class, 'id_facture');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }
}