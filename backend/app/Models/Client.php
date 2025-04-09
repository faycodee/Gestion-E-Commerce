<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'client';

    protected $fillable = [
        'id_privilege',
        'nom',
        'prenom',
        'email',
        'adresse',
        'telephone',
        'login',
        'mdp',
        'dateC',
    ];

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_client');
    }

    public function paniers()
    {
        return $this->hasMany(Panier::class, 'id_client');
    }

    public function avis()
    {
        return $this->hasMany(Avis::class, 'id_client');
    }

    public function privilege()
    {
        return $this->belongsTo(Privilege::class, 'id_privilege');
    }
}