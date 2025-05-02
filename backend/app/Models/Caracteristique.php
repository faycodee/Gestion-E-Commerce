<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caracteristique extends Model
{
    use HasFactory;

    protected $fillable = [
        'couleur',
        'taille',
        'produit_id',
    ];

    public function produit()
{
    return $this->belongsTo(Produit::class, 'produit_id');
}
}