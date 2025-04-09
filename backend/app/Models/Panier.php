<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;

    protected $table = 'panier';

    protected $fillable = [
        'montant',
        'createddate',
        'updateddate',
        'id_client',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }

    public function lignes()
    {
        return $this->hasMany(LignePanier::class, 'id_panier');
    }
}