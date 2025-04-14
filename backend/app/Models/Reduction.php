<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reduction extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'pourcentage_reduction',
        'actif',
        'periode_reduction',
    ];

    public function reductionProduits()
    {
        return $this->hasMany(ReductionProduit::class);
    }
}