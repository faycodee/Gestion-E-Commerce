<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'prix_HT',
        'quantity',
        'image',
        'category_id',
        'tva_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tva()
    {
        return $this->belongsTo(TVA::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function caracteristiques()
    {
        return $this->hasMany(Caracteristique::class);
    }

    public function lignePanier()
    {
        return $this->hasMany(LignePanier::class);
    }
}