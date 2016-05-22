<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePartidaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partida', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("jogador_1")->unsigned()->nullable();
            $table->integer("jogador_2")->unsigned()->nullable();
            $table->integer("pontos_1")->nullable();
            $table->integer("pontos_2")->nullable();
            $table->time("duracao")->nullable();
            //$table->enum("situacao", ["Pendente","Em andamento", "Concluido"]);
            $table->foreign("jogador_1")->references("id")->on("jogador");
            $table->foreign("jogador_2")->references("id")->on("jogador");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('partida');
    }
}
