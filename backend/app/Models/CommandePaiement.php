<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandePaiement extends Model
{
    use HasFactory;

    protected $table = 'commande_paiement';

    protected $fillable = [
        'reference',
        'montant',
        'date',
        'id_commande',
        'id_paiement',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

    public function paiement()
    {
        return $this->belongsTo(Paiement::class, 'id_paiement');
    }
}