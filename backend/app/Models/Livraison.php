<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livraison extends Model
{
    use HasFactory;

    protected $table = 'livraison';

    protected $fillable = [
        'frais_expedition',
        'date_livraison',
        'nom_livreur',
        'prenom_livreur',
        'tel_livreur',
    ];

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_commande');
    }

    public function ligneLivraisons()
    {
        return $this->hasMany(LigneLivraison::class, 'id_livraison');
    }
}