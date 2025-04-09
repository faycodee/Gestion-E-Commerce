<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;

    protected $table = 'ville';

    protected $fillable = [
        'nom',
        'id_pays',
    ];

    public function pays()
    {
        return $this->belongsTo(Pays::class, 'id_pays');
    }

    public function codePostals()
    {
        return $this->hasMany(CodePostal::class, 'id_ville');
    }
}