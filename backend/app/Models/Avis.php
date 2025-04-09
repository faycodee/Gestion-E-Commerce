<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'commentaire',
        'id_client',
        'id_produit',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }
}