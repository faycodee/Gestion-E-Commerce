<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $table = 'paiement';

    protected $fillable = [
        'type_paiement',
        'etat',
        'date_paiement',
        'details',
    ];

    public function commandes()
    {
        return $this->hasMany(CommandePaiement::class, 'id_paiement');
    }
}