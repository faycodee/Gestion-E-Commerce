<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'methode',
        'date_paiment',
        'updateDate',
        'facture_id',
    ];

    public function facture()
    {
        return $this->belongsTo(Facture::class);
    }
}