<?php $page = ""; ?>
@include("header")

<div class="row">
    <div class="col-md-12">
        <h1 class="main-text">Pongnator</h1>
        <p class="main-subtext">O jogo de pong mais divertido de todos os tempos!</p>
        
        <div style="text-align: center;">
            <a href="{{ route("jogador") }}" class="btn btn-raised btn-primary">Cadastrar Jogadores</a>
            <a href="{{ route("campeonato") }}" class="btn btn-raised btn-success">Acompanhar campeonato</a>
        </div>
    </div>
</div>

@include("footer")