<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientAdresse extends Model
{
    use HasFactory;

    protected $table = 'client_adresse';

    protected $fillable = [
        'rue',
        'id_client',
        'id_ville',
        'prenom',
        'nom_famile',
        'ligne1',
        'numero',
        'createdDate',
        'updateDate',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class, 'id_ville');
    }
}