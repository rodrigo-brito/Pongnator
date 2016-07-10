<!DOCTYPE html>
<html>
    <head>
        <title>Pongnator</title>

        <link href="{{ URL::asset("css/bootstrap.css") }}" rel="stylesheet" type="text/css">
        <link href="{{ URL::asset("css/bootstrap-material-design.css") }}" rel="stylesheet" type="text/css">
        <link href="{{ URL::asset("css/ripples.css") }}" rel="stylesheet" type="text/css">
        <link href="{{ URL::asset("css/font-awesome.css") }}" rel="stylesheet" type="text/css">
        <link href="{{ URL::asset("css/default.css") }}" rel="stylesheet" type="text/css">
    </head>
    <body>

        <div class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button data-target=".navbar-responsive-collapse" data-toggle="collapse" class="navbar-toggle" type="button">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="{{ route("/") }}" class="navbar-brand">Pongnator</a>
                </div>
                <div class="navbar-collapse collapse navbar-responsive-collapse">
                    <ul class="nav navbar-nav">
                        <li class="{{ isset($page) && $page == "jogador" ? "active" : "" }}"><a href="{{ route("jogador") }}"><i class="fa fa-user"></i> Jogadores</a></li>
                        <li class="{{ isset($page) && $page == "campeonato" ? "active" : "" }}"><a href="{{ route("campeonato") }}"><i class="fa fa-gamepad"></i> Campeonato</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="container-fluid">
        
            @include("includes.mensagens")