<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'name',
        'role',
        'email',
        'password',
        'tele',
        'adresse',
    ];

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function favourites()
    {
        return $this->hasMany(Favourite::class);
    }

    public function paniers()
    {
        return $this->hasMany(Panier::class);
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }
}