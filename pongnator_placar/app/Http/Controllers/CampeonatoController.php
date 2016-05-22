<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Partida;
use Jogador;
use Validator;

class CampeonatoController extends Controller {

    public function index() {
        return view('campeonato.listar');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {
        $partida = Partida::find($id);
        $jogadores = Jogador::orderBy("nome", "ASC")->get();
        if (!is_null($partida)) {
            return view('campeonato.editar', [
                "partida" => $partida,
                "jogadores" => $jogadores,
            ]);
        } else {
            return redirect()->route('/')->withErrors(['Esse registro não foi encontrado no sistema.']);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request) {
        $dados = $request->all();
        $validate = Validator::make($dados, [
            'jogador_1' => 'exists:jogador,id',
            'jogador_2' => 'exists:jogador,id',
            'pontos_1' => 'Integer',
            'pontos_2' => 'Integer',
            'duracao' => 'date_format:"i:s"',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate->errors());
        }

        $id = $request->input('id');

        $partida = Partida::find($id);
        $partida->fill([
            "jogador_1" => $dados["jogador_1"],
            "jogador_2" => $dados["jogador_2"],
            "pontos_1" => $dados["pontos_1"],
            "pontos_2" => $dados["pontos_2"],
            "duracao" => $dados["duracao"],
        ]);
        $partida->save();
        return redirect()->route('campeonato')->with('status', 'Partida atualizada com sucesso!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restart() {

        $partidas = Partida::get();
        foreach ($partidas as $partida) {
            $partida->fill([
                "jogador_1" => null,
                "jogador_2" => null,
                "pontos_1" => null,
                "pontos_2" => null,
                "duracao" => null,
            ]);
            $partida->save();
        }

        return redirect()->route('campeonato')->with('status', 'Campeonato reiniciado com sucesso!');
    }

}
