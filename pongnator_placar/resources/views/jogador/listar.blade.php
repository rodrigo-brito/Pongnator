<?php $page = "jogador"; ?>
@include("header")

<div class="container-fluid">

    <div class="row">
        <div class="col-md-12 div-cab">
            <h1><i class="fa fa-user"></i> Jogadores</h1>
            <p>Lista de jogadores do campeonato.</p>
        </div>
    </div>

    @include("jogador.menu")

    <div class="row">

        <div class="col-md-6">

            <div class="well">
                <h3>Lista</h3>

                <?php if (count($jogadores) > 0) { ?>

                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th style="width: 1px;">#</th>
                                <th style="width: 1px;">Avatar</th>
                                <th>Nome</th>
                                <th style="width: 1px;">&nbsp;</th>
                                <th style="width: 1px;">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($jogadores as $jogador) { ?>
                            <tr>
                                <td>{{ $jogador->id }}</td>
                                <td style="text-align: center;vertical-align: center;">
                                    <img src="{{ URL::asset("images/avatar" . $jogador->avatar . ".png") }}" class="img-circle" style="width: 50px;">
                                </td>
                                <td>{{ $jogador->nome }}</td>
                                <td>
                                    <a href="{{ route("jogador.editar", ["id" => $jogador->id]) }}" class="btn btn-raised btn-primary"><i class="fa fa-pencil"></i></a>
                                </td>
                                <td>
                                    <a href="{{ route("jogador.excluir", ["id" => $jogador->id]) }}" class="btn btn-raised btn-danger"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <?php } ?>
                        </tbody>
                    </table>

                <?php } else { ?>
                    <p>Nenhum jogador cadastrado.</p>
                <?php } ?>

            </div>

        </div>
    </div>

</div>

@include("footer")

