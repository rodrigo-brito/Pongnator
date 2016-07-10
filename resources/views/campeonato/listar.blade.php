<?php $page = "campeonato"; ?>
@include("header")

<div class="container-fluid">

    <div class="row">
        <div class="col-md-12 div-cab">
            <h1><i class="fa fa-gamepad"></i> Campeonato</h1>
            <p>Acompanhe os resultados do campeonato.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <a href="{{ route("campeonato.reiniciar") }}" class="btn btn-raised btn-primary"><i class="fa fa-repeat"></i> Reiniciar campeonato</a>
        </div>
    </div>

    <?php
    $partida_id = 1;
    ?>

    <div class="row">
        <div class="col-md-12">

            <h3>Oitavas de final</h3>

            <div class="row">

                <?php
                for ($i = 0; $i < 8; $i++) {
                    $partida = Partida::find($partida_id);

                    $jogador1 = $partida->getJogador1();
                    $jogador2 = $partida->getJogador2();

                    $avatar1 = !is_null($jogador1) ? $jogador1->avatar : "";
                    $avatar2 = !is_null($jogador2) ? $jogador2->avatar : "";

                    $nome1 = !is_null($jogador1) ? $jogador1->nome : "Desconhecido";
                    $nome2 = !is_null($jogador2) ? $jogador2->nome : "Desconhecido";

                    $pontos1 = (int) $partida->pontos_1;
                    $pontos2 = (int) $partida->pontos_2;

                    $duracao = $partida->getDuracao();

                    $ganhador = $partida->getGanhador();
                    ?>
                    <div class="col-md-3">
                        <div class="well placar1">
                            <div class="row">
                                <div class="col-md-5" style="text-align: center;">
                                    <img class="img-thumbnail img-circle" src="{{ URL::asset("images/avatar" . $avatar1 . ".png") }}">
                                    <p>{{ $nome1 }}</p>
                                    <p class="pontos">
                                        <?php if ($ganhador == 1) { ?>    
                                            <i class="fa fa-trophy vencedor"></i> 
                                        <?php } ?>
                                        {{ $pontos1 }}</p>                      
                                </div>
                                <div class="col-md-2 versus">
                                    vs.
                                </div>
                                <div class="col-md-5" style="text-align: center;">
                                    <img class="img-thumbnail img-circle" src="{{ URL::asset("images/avatar" . $avatar2 . ".png") }}">
                                    <p>{{ $nome2 }}</p>
                                    <p class="pontos">{{ $pontos2 }} 
                                        <?php if ($ganhador == 2) { ?>
                                            <i class="fa fa-trophy vencedor"></i> 
                                        <?php } ?>
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12" style="text-align: center">
                                    <p>{{ $duracao }}</p>
                                    <div class="btn-group">
                                        @if( $partida->podeJogar() )
                                        <a class="btn btn-sm btn-raised btn-warning" href="{{ route("campeonato.jogar", ["id" => $partida]) }}"></i> Jogar</a>
                                        @endif
                                        <a class="btn btn-sm btn-raised btn-primary" href="{{ route("campeonato.editar", ["id" => $partida]) }}"></i> Alterar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                    $partida_id++;
                }
                ?>

            </div>








            <h3>Quartas de final</h3>

            <div class="row">

                <?php
                for ($i = 0; $i < 4; $i++) {
                    $partida = Partida::find($partida_id);

                    $jogador1 = $partida->getJogador1();
                    $jogador2 = $partida->getJogador2();

                    $avatar1 = !is_null($jogador1) ? $jogador1->avatar : "";
                    $avatar2 = !is_null($jogador2) ? $jogador2->avatar : "";

                    $nome1 = !is_null($jogador1) ? $jogador1->nome : "Desconhecido";
                    $nome2 = !is_null($jogador2) ? $jogador2->nome : "Desconhecido";

                    $pontos1 = (int) $partida->pontos_1;
                    $pontos2 = (int) $partida->pontos_2;

                    $duracao = $partida->getDuracao();

                    $ganhador = $partida->getGanhador();
                    ?>
                    <div class="col-md-3">
                        <div class="well placar1">
                            <div class="row">
                                <div class="col-md-5" style="text-align: center;">
                                    <img class="img-thumbnail img-circle" src="{{ URL::asset("images/avatar" . $avatar1 . ".png") }}">
                                    <p>{{ $nome1 }}</p>
                                    <p class="pontos">
                                        <?php if ($ganhador == 1) { ?>    
                                            <i class="fa fa-trophy vencedor"></i> 
                                        <?php } ?>
                                        {{ $pontos1 }}</p>
                                </div>
                                <div class="col-md-2 versus">
                                    vs.
                                </div>
                                <div class="col-md-5" style="text-align: center;">
                                    <img class="img-thumbnail img-circle" src="{{ URL::asset("images/avatar" . $avatar2 . ".png") }}">
                                    <p>{{ $nome2 }}</p>
                                    <p class="pontos">{{ $pontos2 }} 
                                        <?php if ($ganhador == 2) { ?>
                                            <i class="fa fa-trophy vencedor"></i> 
                                        <?php } ?>
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12" style="text-align: center">
                                    <p>{{ $duracao }}</p>
                                    <div class="btn-group">
                                        @if( $partida->podeJogar() )
                                        <a class="btn btn-sm btn-raised btn-warning" href="{{ route("campeonato.jogar", ["id" => $partida]) }}"></i> Jogar</a>
                                        @endif
                                        <a class="btn btn-sm btn-raised btn-primary" href="{{ route("campeonato.editar", ["id" => $partida]) }}"></i> Alterar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                    $partida_id++;
                }
                ?>

            </div>






            <h3>Semi final</h3>

            <div class="row">

                <?php
                for ($i = 0; $i < 2; $i++) {
                    $partida = Partida::find($partida_id);

                    $jogador1 = $partida->getJogador1();
                    $jogador2 = $partida->getJogador2();

                    $avatar1 = !is_null($jogador1) ? $jogador1->avatar : "";
                    $avatar2 = !is_null($jogador2) ? $jogador2->avatar : "";

                    $nome1 = !is_null($jogador1) ? $jogador1->nome : "Desconhecido";
                    $nome2 = !is_null($jogador2) ? $jogador2->nome : "Desconhecido";

                    $pontos1 = (int) $partida->pontos_1;
                    $pontos2 = (int) $partida->pontos_2;

                    $duracao = $partida->getDuracao();

                    $ganhador = $partida->getGanhador();
                    ?>
                    <div class="col-md-6">
                        <div class="well placar2">
                            <div class="row">
                                <div class="col-md-5" style="text-align: center;">
                                    <img class="img-thumbnail img-circle" src="{{ URL::asset("images/avatar" . $avatar1 . ".png") }}">
                                    <p>{{ $nome1 }}</p>
                                    <p class="pontos">
                                        <?php if ($ganhador == 1) { ?>    
                                            <i class="fa fa-trophy vencedor"></i> 
                                        <?php } ?>
                                        {{ $pontos1 }}</p>                      
                                </div>
                                <div class="col-md-2 versus">
                                    vs.
                                </div>
                                <div class="col-md-5" style="text-align: center;">
                                    <img class="img-thumbnail img-circle" src="{{ URL::asset("images/avatar" . $avatar2 . ".png") }}">
                                    <p>{{ $nome2 }}</p>
                                    <p class="pontos">{{ $pontos2 }} 
                                        <?php if ($ganhador == 2) { ?>
                                            <i class="fa fa-trophy vencedor"></i> 
                                        <?php } ?>
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12" style="text-align: center">
                                    <p>{{ $duracao }}</p>
                                    <div class="btn-group">
                                        @if( $partida->podeJogar() )
                                        <a class="btn btn-md btn-raised btn-warning" href="{{ route("campeonato.jogar", ["id" => $partida]) }}"></i> Jogar</a>
                                        @endif
                                        <a class="btn btn-md btn-raised btn-primary" href="{{ route("campeonato.editar", ["id" => $partida]) }}"></i> Alterar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                    $partida_id++;
                }
                ?>

            </div>






            <h3>Final</h3>

            <div class="row">
                <?php
                $partida = Partida::find($partida_id);

                $jogador1 = $partida->getJogador1();
                $jogador2 = $partida->getJogador2();

                $avatar1 = !is_null($jogador1) ? $jogador1->avatar : "";
                $avatar2 = !is_null($jogador2) ? $jogador2->avatar : "";

                $nome1 = !is_null($jogador1) ? $jogador1->nome : "Desconhecido";
                $nome2 = !is_null($jogador2) ? $jogador2->nome : "Desconhecido";

                $pontos1 = (int) $partida->pontos_1;
                $pontos2 = (int) $partida->pontos_2;

                $duracao = $partida->getDuracao();

                $ganhador = $partida->getGanhador();
                ?>
                <div class="col-md-12">
                    <div class="well placar3">
                        <div class="row">
                            <div class="col-md-3" style="text-align: center;">
                                <img class="img-thumbnail img-circle" src="{{ URL::asset("images/avatar" . $avatar1 . ".png") }}">
                                <p>{{ $nome1 }}</p>
                            </div>
                            <div class="col-md-6" style="text-align: center;">
                                <div class="row placar">
                                    <div class="col-md-4">
                                        <p class="pontos">
                                            <?php if ($ganhador == 1) { ?>
                                                <i class="fa fa-trophy vencedor"></i> 
                                            <?php } ?>
                                            {{ $pontos1 }}
                                        </p>
                                    </div>
                                    <div class="col-md-4 versus">vs.</div>
                                    <div class="col-md-4">
                                        <p class="pontos">
                                            {{ $pontos2 }} 
                                            <?php if ($ganhador == 2) { ?>
                                                <i class="fa fa-trophy vencedor"></i> 
                                            <?php } ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3" style="text-align: center;">
                                <img class="img-thumbnail img-circle" src="{{ URL::asset("images/avatar" . $avatar2 . ".png") }}">
                                <p>{{ $nome2 }}</p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12" style="text-align: center">
                                <p>{{ $duracao }}</p>
                                <div class="btn-group">
                                    @if( $partida->podeJogar() )
                                    <a class="btn btn-lg btn-raised btn-warning" href="{{ route("campeonato.jogar", ["id" => $partida]) }}"></i> Jogar</a>
                                    @endif
                                    <a class="btn btn-lg btn-raised btn-primary" href="{{ route("campeonato.editar", ["id" => $partida]) }}"></i> Alterar</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>




        </div>
    </div>

</div>

@include("footer")

