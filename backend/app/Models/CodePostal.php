<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodePostal extends Model
{
    use HasFactory;

    protected $table = 'code_postal';

    protected $fillable = [
        'code_postal',
        'id_ville',
    ];

    public function ville()
    {
        return $this->belongsTo(Ville::class, 'id_ville');
    }
}