<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jogador extends Model {

    protected $table = "jogador";
    protected $fillable = ["id", "nome", "avatar"];

}
