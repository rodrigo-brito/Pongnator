<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Jogador;
use Validator;

class JogadorController extends Controller {

    public function index() {
        $jogadores = Jogador::orderBy("nome", "ASC")->get();
        return view('jogador.listar', ["jogadores" => $jogadores]);
    }

    public function cadastrar() {
        return view('jogador.cadastrar');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validate = Validator::make($request->all(), [
            'nome' => 'required|max:32',
            'avatar' => 'required|integer',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate->errors())->withInput();
        }

        Jogador::create($request->all());
        return redirect()->route('jogador')->with('status', 'Jogador criado com sucesso!');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {
        $jogador = Jogador::find($id);
        if (!is_null($jogador)) {
            return view('jogador.editar', [
                "jogador" => $jogador,
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
            'nome' => 'required|max:32',
            'avatar' => 'required|integer',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate->errors());
        }

        $id = $request->input('id');

        $jogador = Jogador::find($id);
        $jogador->fill([
            "nome" => $dados["nome"],
            "avatar" => $dados["avatar"],
        ]);
        $jogador->save();
        return redirect()->route('jogador')->with('status', 'Jogador atualizado com sucesso!');
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id) {
        $jogador = Jogador::find($id);
        $jogador->delete();
        return redirect()->route('jogador')->with('status', 'Jogador excluído com sucesso!');
    }

}
