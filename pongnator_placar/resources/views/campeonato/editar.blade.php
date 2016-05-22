<?php $page = "jogador"; ?>
@include("header")

<div class="container-fluid">

    <div class="row">
        <div class="col-md-12 div-cab">
            <h1><i class="fa fa-user"></i> Campeonato</h1>
            <p>Alterar dados da partida.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">

            <div class="well">
                <h3>Editar</h3>

                <form method="POST" action="{{ route("campeonato.atualizar", ["id" => $partida->id]) }}">
                    <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}" />
                    <div class="row">
                        <div class="col-md-9">
                            <div class="form-group">
                                <label for="jogador_1">Jogador 1</label>
                                <select id="jogador_1" name="jogador_1" class="form-control">
                                    <?php $jogador1 = old("jogador_1", $partida->jogador_1);
                                    foreach ($jogadores as $jogador) { ?>
                                    <option value="{{ $jogador->id }}" <?= $jogador1 == $jogador->id ? "selected" : ""?>>{{ $jogador->nome }}</option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="jogador_2">Jogador 2</label>
                                <select id="jogador_2" name="jogador_2" class="form-control">
                                    <?php $jogador2 = old("jogador_2", $partida->jogador_2);
                                    foreach ($jogadores as $jogador) { ?>
                                    <option value="{{ $jogador->id }}" <?= $jogador2 == $jogador->id ? "selected" : ""?>>{{ $jogador->nome }}</option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="pontos_1">Pontos 1</label>
                                <input type="text" class="form-control" id="pontos_1" name="pontos_1" maxlength="2" value="{{ old("pontos_1", $partida->pontos_1) }}">
                            </div>

                            <div class="form-group">
                                <label for="pontos_2">Pontos 2</label>
                                <input type="text" class="form-control" id="pontos_2" name="pontos_2" maxlength="2" value="{{ old("pontos_2", $partida->pontos_2) }}">
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="duracao">Duração</label>
                                <input type="text" class="form-control input-time" id="duracao" name="duracao" maxlength="5" value="{{ old("duracao", $partida->duracao) }}">
                            </div>
                        </div>
                    </div>



                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <button type="submit" class="btn btn-raised btn-primary">Salvar</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    </div>

</div>

@include("footer")

