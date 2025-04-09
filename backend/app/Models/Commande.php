<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'montant',
        'date',
        'updatedate',
        'id_client',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }

    public function factures()
    {
        return $this->hasMany(Facture::class, 'id_commande');
    }

    public function lignesCommande()
    {
        return $this->hasMany(LigneCommande::class, 'id_commande');
    }
}