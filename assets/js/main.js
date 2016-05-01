//// Matter.js module aliases
var Engine = Matter.Engine,
World = Matter.World,
Body = Matter.Body,
Bodies = Matter.Bodies,
Common = Matter.Common,
Constraint = Matter.Constraint,
Composites = Matter.Composites,
Events = Matter.Events,
MouseConstraint = Matter.MouseConstraint,
render = Matter.Render.create();

// define os estados de jogo possiveis
var EstadoJogo = {
	PAUSADO: 1,
	JOGANDO: 2,
	TERMINADO: 3,
};

// define os diferentes tipos de powerups
var TiposPowerUp = {

	ALEATORIO: 1,
	AUMENTAR_BARRA: 2,
	DIMINUIR_BARRA: 3,
	INVERTER_BARRA: 4,

}

var estadoAtual = EstadoJogo.JOGANDO;

// define o tipo de powerup atual
var tipoPowerUpAtual = TiposPowerUp.ALEATORIO;

var texPlacar = new Image();
texPlacar.src = "assets/img/placar.png";


var TEX_BOLA = "assets/img/bola1.png";
var TEX_JOGADOR = "assets/img/jogador1.png";
var TEX_POWERUP = "assets/img/powerup/aleatorio/sprites_powerup_aleatorio.png";
var TEX_POWERUP_AUMENTAR_BARRA = "assets/img/powerup/aumentar_barra/sprites_powerup_aumentar_barra.png";
var TEX_POWERUP_DIMINUIR_BARRA = "assets/img/powerup/diminuir_barra/sprites_powerup_diminuir_barra.png";
var TEX_POWERUP_INVERTER_BARRA = "assets/img/powerup/inverter_barra/sprites_powerup_inverter_barra.png";
var TEX_BACKGROUND = "assets/img/backgrounds/bg03.png";
var TEX_BARRA_SUPERIOR = "assets/img/barra_superior.png";
var TEX_BARRA_INFERIOR = "assets/img/barra_inferior.png";
var TEX_SPRITESHEET_BOLA = "assets/img/bola/spritesheet_bola.png"

var LARGURA = 1000;
var ALTURA = 500;

var minJogadorPosY = 80;
var maxJogadorPosY = ALTURA-80;

var taxaAumentoVelocidade = .5;
var velocidadeJogador = 10;


var spriteBola = {
	larguraSprite: 128,
	alturaSprite: 128,
	// quantidade de figuras na horizontal
	quantSpritesX: 30,
	// quantidade de figuras na vertical
	quantSpritesY: 1,
	indiceAtualX:0,
	indiceAtualY:0,

	getNextSourceX: function(){
		this.indiceAtualX<this.quantSpritesX-1?this.indiceAtualX++:this.indiceAtualX=0;
		return this.indiceAtualX*this.larguraSprite;
	},

	getNextSourceY: function(){
		this.indiceAtualY<this.quantSpritesY-1?this.indiceAtualY++:this.indiceAtualY=0;
		return this.indiceAtualY*this.alturaSprite;
	}
}

var spritePowerUp = {



	larguraSprite: 128,
	alturaSprite: 128,
	// quantidade de figuras na horizontal
	quantSpritesX: 60,
	// quantidade de figuras na vertical
	quantSpritesY: 1,
	indiceAtualX:0,
	indiceAtualY:0,

	getNextSourceX: function(){
		this.indiceAtualX<this.quantSpritesX-1?this.indiceAtualX++:this.indiceAtualX=0;
		return this.indiceAtualX*this.larguraSprite;
	},

	getNextSourceY: function(){
		this.indiceAtualY<this.quantSpritesY-1?this.indiceAtualY++:this.indiceAtualY=0;
		return this.indiceAtualY*this.alturaSprite;
	}

}

var spritePowerUpAumentarBarra = {
	larguraSprite: 128,
	alturaSprite: 128,
	// quantidade de figuras na horizontal
	quantSpritesX: 60,
	// quantidade de figuras na vertical
	quantSpritesY: 1,
	indiceAtualX:0,
	indiceAtualY:0,

	getNextSourceX: function(){
		this.indiceAtualX<this.quantSpritesX-1?this.indiceAtualX++:this.indiceAtualX=0;
		return this.indiceAtualX*this.larguraSprite;
	},

	getNextSourceY: function(){
		this.indiceAtualY<this.quantSpritesY-1?this.indiceAtualY++:this.indiceAtualY=0;
		return this.indiceAtualY*this.alturaSprite;
	}
}

var spritePowerUpDiminuirBarra = {
	larguraSprite: 128,
	alturaSprite: 128,
	// quantidade de figuras na horizontal
	quantSpritesX: 60,
	// quantidade de figuras na vertical
	quantSpritesY: 1,
	indiceAtualX:0,
	indiceAtualY:0,

	getNextSourceX: function(){
		this.indiceAtualX<this.quantSpritesX-1?this.indiceAtualX++:this.indiceAtualX=0;
		return this.indiceAtualX*this.larguraSprite;
	},

	getNextSourceY: function(){
		this.indiceAtualY<this.quantSpritesY-1?this.indiceAtualY++:this.indiceAtualY=0;
		return this.indiceAtualY*this.alturaSprite;
	}
}

var spritePowerInverterDirecaoBarra = {
	larguraSprite: 128,
	alturaSprite: 128,
	// quantidade de figuras na horizontal
	quantSpritesX: 60,
	// quantidade de figuras na vertical
	quantSpritesY: 1,
	indiceAtualX:0,
	indiceAtualY:0,

	getNextSourceX: function(){
		this.indiceAtualX<this.quantSpritesX-1?this.indiceAtualX++:this.indiceAtualX=0;
		return this.indiceAtualX*this.larguraSprite;
	},

	getNextSourceY: function(){
		this.indiceAtualY<this.quantSpritesY-1?this.indiceAtualY++:this.indiceAtualY=0;
		return this.indiceAtualY*this.alturaSprite;
	}
}


// create a Matter.js engine
var engine = Engine.create(document.body, {
	render: {
		options: {
			wireframes: false,
			showAngleIndicator: false,
			width: 1000,
			height: 500,
			background: TEX_BACKGROUND,
		}
	},
	world: {
		gravity: {
			x: 0,
			y: 0
		}
	}
});

//Controle manual com o mouse de elementos fluidos
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

/**
 * Funções de controle da partida
 * ---------------------------------------------------------------
 */

function reiniciarRodada(){
	Body.setVelocity(bola, {x: 0, y: 0});
	Body.setAngularVelocity(bola, 0);
	Body.setPosition(bola, {x: LARGURA/2-7, y: ALTURA/2-7});
	estadoAtual = EstadoJogo.PAUSADO;
}

function lancarBola(){
	Body.setVelocity(bola, {x: -5, y: -5});
}

function lancarPowerUp(){
	setInterval(function(){

		// define um tipo aleatorio de powerup
		var r = Math.floor(Math.random() * 4) + 1;
		switch(r){
			case 1:
				tipoPowerUpAtual = TiposPowerUp.ALEATORIO;
				powerUp.render.sprite.texture = TEX_POWERUP;
				break;
			case 2:
				tipoPowerUpAtual = TiposPowerUp.AUMENTAR_BARRA;
				powerUp.render.sprite.texture = TEX_POWERUP_AUMENTAR_BARRA;
				break;
			case 3:
				tipoPowerUpAtual = TiposPowerUp.DIMINUIR_BARRA;
				powerUp.render.sprite.texture = TEX_POWERUP_DIMINUIR_BARRA;
				break;
			case 4:
				tipoPowerUpAtual = TiposPowerUp.INVERTER_BARRA;
				powerUp.render.sprite.texture = TEX_POWERUP_INVERTER_BARRA;
				break;
			default:
				break;

		}

		powerUp.collisionFilter = bola.collisionFilter;
		Body.setVelocity(powerUp, {x: 0, y: 0});
		Body.setAngularVelocity(powerUp, 0);
		Body.setPosition(powerUp, {x: Math.floor((Math.random() * LARGURA) + 1), y: Math.floor((Math.random() * ALTURA) + 1)});
	}, 10000);
}

// funcao de desenho
// realiza todo o desenho dos objetos na tela
function draw(){
	// recupera o objeto canvas
	var context = engine.render.context;
	// analisa o suporte pelo navegador
	if(context){
		//desenha o placar
		context.drawImage(texPlacar, LARGURA/2-75,0,150,40);
		context.fillStyle = "#FFF";
		context.font = "30px Arial";
		context.fillText(player1.pontuacao, LARGURA/2-55, 26);
		context.fillText(player2.pontuacao, LARGURA/2+40, 26);


		// caso o jogo esteja pausado, pede que o usuario pressione espaco
		// removendo isto, faz com que o jogo seja continuo
		if (estadoAtual == EstadoJogo.PAUSADO) {
			context.fillStyle = "#FFF";
			context.fillText("Pressione espaco para continuar",300,ALTURA/2);

			// Define que a bola estara estacionaria
			Body.setPosition(bola, {x: LARGURA/2-7, y: ALTURA/2-7});
			Body.setVelocity(bola, {x: 0, y: 0});
		}

	}

	// atualiza os sprites
	bola.render.sprite.sourceX = spriteBola.getNextSourceX();
	bola.render.sprite.sourceY = spriteBola.getNextSourceY();
	//spriteBola.getNextSourceX();
	//spriteBola.render;
	powerUp.render.sprite.sourceX = spritePowerUp.getNextSourceX();
	powerUp.render.sprite.sourceY = spritePowerUp.getNextSourceY();
}

/**
 * Instaciação de elementos na partida
 * ---------------------------------------------------------------
 */


//Borda Direita
var bordaDireita = Bodies.rectangle(LARGURA+20, ALTURA/2, 50, 500, { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1,
render: {
    visible:false
  }
 });
//Borda Esquerda
var bordaEsquerda = Bodies.rectangle(-20, ALTURA/2, 50, 500, { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1 ,
render: {
    visible:false
  }
});
//Borda Topo
var bordaTopo = Bodies.rectangle(LARGURA/2, 10, LARGURA, 50, { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1 ,
render: {
    sprite: {
      texture: TEX_BARRA_SUPERIOR,
      xScale: 1.0,
      yScale: 1.0
    }
  }
});
//Borda Baixo
var bordaBaixo = Bodies.rectangle(LARGURA/2, ALTURA-10, LARGURA, 50, { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1,
render: {
    sprite: {
      texture: TEX_BARRA_INFERIOR,
      xScale: 1.0,
      yScale: 1.0,
    }
  }
});

//Declaração dos elementos do jogo
var bola = Bodies.circle(LARGURA/2, ALTURA/2, 15, { mass: 1, inertia: 0, friction: 0, restitution: 1,  frictionStatic: 0, frictionAir: 0,
render: {
    sprite: {
      texture: TEX_SPRITESHEET_BOLA,
      xScale: .5/spriteBola.quantSpritesX,
      yScale: .5/spriteBola.quantSpritesY,
      sourceX: spriteBola.getNextSourceX(),
      sourceY: spriteBola.getNextSourceY(),
      sourceWidth: spriteBola.larguraSprite,
      sourceHeight: spriteBola.alturaSprite,

    }
  }
});



var player1 = Bodies.rectangle(20, ALTURA/2, 20, 100, { inertia: 0, frictionStatic: 1, isStatic: true, frictionAir: 0, friction: 0, restitution: 1,
render: {
    sprite: {
      texture: TEX_JOGADOR,
      xScale: 0.5,
      yScale: 0.5
    }
  }
 });
var player2 = Bodies.rectangle( LARGURA-20, ALTURA/2, 20, 100, { inertia: 0, frictionStatic: 1, isStatic: true, frictionAir: 0, friction: 0, restitution: 1, 

render: {
    sprite: {
      texture: TEX_JOGADOR,
      xScale: 0.5,
      yScale: 0.5
    }
  }

});
var powerUp = Bodies.rectangle( 400, 300, 50, 50, { mass: 0.0000001, inertia: 0, frictionStatic: 0, isStatic: false, frictionAir: 0, friction: 0, restitution: 0 ,

render: {
    sprite: {
      texture: TEX_POWERUP,
      xScale: .8/spritePowerUp.quantSpritesX,
      yScale: .8/spritePowerUp.quantSpritesY,
      sourceX: spritePowerUp.getNextSourceX(),
      sourceY: spritePowerUp.getNextSourceY(),
      sourceWidth: spritePowerUp.larguraSprite,
      sourceHeight: spritePowerUp.alturaSprite,
    },
  }

});
//Atributos auxiliares dos jogadores
player1.pontuacao = 0;
player2.pontuacao = 0;

//Adiciona todos os corpos a engine
World.add(engine.world, [
	bordaTopo,
	bordaBaixo,
	bordaDireita,
	bordaEsquerda,
	bola,
	player1,
	player2,
	powerUp
]);

/**
 * Movimentação de jogadores
 * ---------------------------------------------------------------
 */

// utiliza o handler do teclado para selecionar qual movimento deve ser efetuado
function moveJogadores() {
	if(Key.isDown(87)){
		if(player1.position.y>minJogadorPosY || velocidadeJogador < 0){
			Body.setPosition(player1, { x: player1.position.x, y: player1.position.y-velocidadeJogador });
		}
	}
	if(Key.isDown(83)){
		if(player1.position.y<maxJogadorPosY || velocidadeJogador < 0){
			Body.setPosition(player1, { x: player1.position.x, y: player1.position.y+velocidadeJogador });
		}
	}
	if(Key.isDown(Key.ACIMA)){
		if(player2.position.y>minJogadorPosY || velocidadeJogador < 0){
			Body.setPosition(player2, { x: player2.position.x, y: player2.position.y-velocidadeJogador });
		}
	}
	if(Key.isDown(Key.ABAIXO)){
		if(player2.position.y<maxJogadorPosY || velocidadeJogador < 0){
			Body.setPosition(player2, { x: player2.position.x, y: player2.position.y+velocidadeJogador });
		}
	}
}

// analisa as entradas de teclado do usuario
// necessario para que varias teclas sejam detectadas corretamente  
var Key = {
	apertado: {},
	// codigos das teclas
	ESQUERDA: 37,
	ACIMA: 38,
	DIREITA: 39,
	ABAIXO: 40,
	isDown: function(keyCode) {
		return this.apertado[keyCode];
	},
	onKeydown: function(event) {
		this.apertado[event.keyCode] = true;
	},
	onKeyup: function(event) {
		delete this.apertado[event.keyCode];
	}
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);


Events.on(engine, 'afterRender', function(event){
	if(estadoAtual == EstadoJogo.PAUSADO){
		if(Key.isDown(32)){
			estadoAtual = EstadoJogo.JOGANDO;
			lancarBola();
		}
	}
	moveJogadores();
	draw();
});

function aumentaVelocidadeBola(){
	if(bola.velocity.x>0 && bola.velocity.y>0){
		Body.setVelocity(bola, {x:bola.velocity.x+taxaAumentoVelocidade,y:bola.velocity.y+taxaAumentoVelocidade});
	}else if(bola.velocity.x<0 && bola.velocity.y<0){
		Body.setVelocity(bola, {x:bola.velocity.x-taxaAumentoVelocidade,y:bola.velocity.y-taxaAumentoVelocidade});
	}else if(bola.velocity.x>0 && bola.velocity.y<0){
		Body.setVelocity(bola, {x:bola.velocity.x+taxaAumentoVelocidade,y:bola.velocity.y-taxaAumentoVelocidade});
	}else{
		Body.setVelocity(bola, {x:bola.velocity.x-taxaAumentoVelocidade,y:bola.velocity.y+taxaAumentoVelocidade});
	}
}

var dobraVelocidadeBola = function(barra, tempo){
	Body.setVelocity(bola, {x: bola.velocity.x*2,y:bola.velocity.y*2});
	if(tempo){
		setTimeout(function(){ dividirVelocidadeBola(barra) }, tempo);
	}
};

var dividirVelocidadeBola = function(barra, tempo){
	Body.setVelocity(bola, {x: bola.velocity.x/2,y:bola.velocity.y/2});
	if(tempo){
		setTimeout(function(){ dobraVelocidadeBola(barra) }, tempo);
	}
};

var reduzBarra = function (barra, tempo){
	Body.scale(barra, 1, 0.5);
	barra.render.sprite.yScale = barra.render.sprite.yScale/2;
	if(tempo){
		setTimeout(function(){ aumentaBarra(barra)}, tempo);
	}
};

var aumentaBarra = function (barra, tempo){
	barra.render.sprite.yScale = barra.render.sprite.yScale * 2;
	Body.scale(barra, 1, 2);
	if(tempo){
		setTimeout(function(){ reduzBarra(barra)}, tempo);
	}
};

var inverterDirecaoBarra = function(barra, tempo ){
	velocidadeJogador *= -1;
	if(tempo){
		setTimeout(function(){ inverterDirecaoBarra(barra)}, tempo);
	}
};

var randPowerUp = function ( barra, tempo ) {
	var efeitos = [ reduzBarra, aumentaBarra, dobraVelocidadeBola, dividirVelocidadeBola, inverterDirecaoBarra ];
	var efeito = efeitos[Math.floor(Math.random() * efeitos.length)];
	efeito(barra, tempo);
};

/**
 * Tratamento de colisões
 * ---------------------------------------------------------------
 */

var colisaoPlayer1 = Matter.Pair.id(bola, player1);
var colisaoPlayer2 = Matter.Pair.id(bola, player2);
var colisaoPontoP1 = Matter.Pair.id(bola, bordaDireita);
var colisaoPontoP2 = Matter.Pair.id(bola, bordaEsquerda);
var colisaoPowerUp = Matter.Pair.id(bola, powerUp);
var colisaoBordaTopo = Matter.Pair.id(bola,bordaTopo);
var colisaoBordaBaixo = Matter.Pair.id(bola,bordaBaixo);

Events.on(engine, "collisionStart", function(event){
	var pairs = event.pairs;
	for (var i = pairs.length - 1; i >= 0; i--) {

		var pair = pairs[i];

		if(pair.id == colisaoPlayer2){
			pair.bodyA.render.fillStyle = 'red';
			pair.bodyB.render.fillStyle = 'red';
			//console.log("x "+bola.velocity.x+" y "+bola.velocity.y);

			// aumenta a velocidade da bola
			aumentaVelocidadeBola();
			// identifica a origem da última rebatida
			powerUp.origem = player2;
		}

		if(pair.id == colisaoPlayer1){
			pair.bodyA.render.fillStyle = 'green';
			pair.bodyB.render.fillStyle = 'green';

			// aumenta a velocidade da bola
			aumentaVelocidadeBola();
			// identifica a origem da última rebatida
			powerUp.origem = player1;
		}

		if(pair.id == colisaoPontoP1){
			player1.pontuacao++;
			reiniciarRodada();
		}

		if(pair.id == colisaoPontoP2){
			player2.pontuacao++;
			reiniciarRodada();
		}

		if(pair.id == colisaoPowerUp){
			pair.bodyA.render.fillStyle = 'yellow';
			pair.bodyB.render.fillStyle = 'yellow';
			Body.setAngularVelocity(powerUp, 0.1);
			powerUp.collisionFilter = -1;
			//inverterDirecaoBarra(powerUp.origem, 5000);
			if(tipoPowerUpAtual == TiposPowerUp.ALEATORIO){
				//ADICIONAR POWERUP ALEATORIO AQUI
			}else if(tipoPowerUpAtual == TiposPowerUp.AUMENTAR_BARRA){
				aumentaBarra(powerUp.origem, 5000);
			}else if(tipoPowerUpAtual == TiposPowerUp.DIMINUIR_BARRA){
				reduzBarra(powerUp.origem, 5000);
			}else if(tipoPowerUpAtual == TiposPowerUp.INVERTER_BARRA){
				inverterDirecaoBarra(powerUp.origem, 5000);
			}
		}

		if(pair.id == colisaoBordaTopo){
			aumentaVelocidadeBola();
		}

		if(pair.id == colisaoBordaBaixo){
			aumentaVelocidadeBola();
		}
	}
});

//Executa a engine
Engine.run(engine);
//Lança a bola no início da partida
lancarBola();
lancarPowerUp();