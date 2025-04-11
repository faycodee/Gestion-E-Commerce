<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

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

    public function client()
    {
        return $this->hasOne(Client::class);
    }

    public $timestamps = true;
}