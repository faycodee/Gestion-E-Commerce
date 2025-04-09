<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SousCategorieImage extends Model
{
    use HasFactory;

    protected $table = 'sous_categorie_image';

    protected $fillable = [
        'nom',
        'url',
        'id_sous_categorie',
    ];

    public function sousCategorie()
    {
        return $this->belongsTo(SousCategorie::class, 'id_sous_categorie');
    }
}