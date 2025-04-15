<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

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