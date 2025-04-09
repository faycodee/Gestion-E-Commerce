<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'montant_ht',
        'montant_ttc',
        'date',
        'updatedate',
        'id_commande',
        'id_client',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }

    public function lignes()
    {
        return $this->hasMany(LigneFacture::class, 'id_facture');
    }
}