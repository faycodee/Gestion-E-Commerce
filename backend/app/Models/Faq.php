<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    protected $table = 'faqs'; // Specify the table name

    protected $primaryKey = 'Id_FAQ'; // Specify the primary key

    protected $fillable = [
        'Question',
        'Reponde',
        'categorie',
        'Nombre_vues',
    ];
}
