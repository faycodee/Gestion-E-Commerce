<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public $timestamps = true;
}