<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $table = 'commandes';

    protected $fillable = [
        'date_achat',
        'statut',
        'commentaire',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function livraisons()
    {
        return $this->hasMany(Livraison::class);
    }

    public function factures()
    {
        return $this->hasMany(Facture::class);
    }

    public function lignesCommande()
    {
        return $this->hasMany(LigneCommande::class);
    }
}