<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $table = 'produit';

    protected $fillable = [
        'nom',
        'id_categorie',
        'description',
        'prix',
        'stock_min',
        'date',
        'id_tva',
        'id_reduction',
        'id_fournisseur',
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }

    public function tva()
    {
        return $this->belongsTo(Tva::class, 'id_tva');
    }

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class, 'id_fournisseur');
    }

    public function produitImages()
    {
        return $this->hasMany(ProduitImage::class, 'id_produit');
    }

    public function lignesCommande()
    {
        return $this->hasMany(LigneCommande::class, 'id_produit');
    }

    public function avis()
    {
        return $this->hasMany(Avis::class, 'id_produit');
    }
}