<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'icon',
        'date',
    ];

    public function produits()
    {
        return $this->hasMany(Produit::class, 'id_categorie');
    }

    public function sousCategories()
    {
        return $this->hasMany(SousCategorie::class, 'id_categorie');
    }
}