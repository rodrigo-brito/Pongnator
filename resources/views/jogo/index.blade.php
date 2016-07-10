<!DOCTYPE html>
<html>
<head>
	<title>Teste de Colisão</title>
	<meta charset="utf-8">
	<link href="{{ URL::asset("assets/css/style.css") }}" rel="stylesheet" type="text/css">
	<style type="text/css" media="screen">
		* {
		  -webkit-box-sizing: border-box;
		     -moz-box-sizing: border-box;
		          box-sizing: border-box;
		}
		#jogo {
			position: relative;
			z-index: 1;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		#webcam {
			position: absolute;
			z-index: -999;
			width: 300px;
			height: 200px;
			visibility: hidden;
		}

		.nomes {
			background: #fff;
			width: 1000px;
			margin: 0 auto;
			font-family: sans-serif;
			font-size: 20px;
			text-transform: uppercase;
			overflow: auto;
			zoom: 1;
		}

		.nomes .player1 {
			float: left;
			padding: 0 20px;
			width: 50%;
		}

		.nomes .player2 {
			float: right;
			padding: 0 20px;
			width: 50%;
		}

		.nome .nome-p1 {
			float: left;
		}

		.nome .nome-p2 {
			float: right;
		}

		.yellow {
			margin-top: 5px;
			float: left;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: yellow;
		}

		.magenta {
			margin-top: 5px;
			float: right;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: magenta;
		}
	</style>
</head>
<body>
<form action="{{ route('campeonato.atualizar') }}"  method="POST" id="partida_form">
	<input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}" />
	<input type="hidden" id="base_url" value="{{ URL::asset('') }}" />
	<input type="hidden" name="id" value="{{ $partida_id }}">
	<input type="hidden" name="jogador_1" value="{{ $jogador1->id }}">
	<input type="hidden" name="jogador_2" value="{{ $jogador2->id }}">
	<input type="hidden" id="pontos_1" name="pontos_1" value="0">
	<input type="hidden" id="pontos_2" name="pontos_2" value="0">
	<input type="hidden" id="tempo" name="duracao" value="">
</form>
<video id="webcam" width="300" height="200" autoplay></video>
<div class="nomes">
	<div class="player1">
		<div class="yellow"></div>
		<p class="nome-p1">{{ $jogador1->nome }}</p>
	</div>
	<div class="player2">
		<div class="magenta"></div>
		<p class="nome-p2">{{ $jogador2->nome }}</p>
	</div>
</div>
<div id="jogo"></div>
<script src="{{ URL::asset("assets/js/lib/tracking-min.js") }}" type="text/javascript" charset="utf-8"></script>
<script src="{{ URL::asset("assets/js/lib/matter.js") }}" type="text/javascript" charset="utf-8"></script>
<script src="{{ URL::asset("assets/js/main.js") }}" type="text/javascript" charset="utf-8"></script>
</body>
</html>
