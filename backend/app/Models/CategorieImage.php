<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategorieImage extends Model
{
    use HasFactory;

    protected $table = 'categorie_image';

    protected $fillable = [
        'nom',
        'url',
        'id_categorie',
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }
}