<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partida extends Model {

    protected $table = "partida";
    protected $fillable = ["id", "jogador_1", "jogador_2", "pontos_1", "pontos_2", "duracao", ""];

    public function getJogador1() {
        return !empty($this->jogador_1) ? Jogador::find($this->jogador_1) : null;
    }
    
    public function getJogador2() {
        return !empty($this->jogador_2) ? Jogador::find($this->jogador_2) : null;
    }
    
    public function getDuracao() {
        return !is_null($this->duracao) ? substr($this->duracao, 0, 5) : "00:00";
    }
    
    public function getGanhador () {
        $pontos1 = (int) $this->pontos_1;
        $pontos2 = (int) $this->pontos_2;
        
        if($pontos1 > $pontos2) {
            return 1;
        } else if($pontos1 < $pontos2) {
            return 2;
        } else {
            return 0;
        }
    }

}
