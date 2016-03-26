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

var LARGURA = 1000;
var ALTURA = 500;

// create a Matter.js engine
var engine = Engine.create(document.body, {
	render: {
		options: {
			wireframes: false,
			showAngleIndicator: true,
			width: 1000,
			height: 500,
			hasBounds: true,
		}
	},
	world: {
		gravity: {
			x: 0,
			y: 0
		}
	}
});

function reiniciarRodada(){
	Body.setVelocity(bola, {x: 0, y: 0});
	Body.setAngularVelocity(bola, 0);
	Body.setPosition(bola, {x: LARGURA/2, y: ALTURA/2});
	estadoAtual = EstadoJogo.PAUSADO;
}

function lancarBola(){
	Body.setVelocity(bola, {x: -5, y: -5});
}

// funcao de desenho
// realiza todo o desenho dos objetos na tela
function draw(){
	// recupera o objeto canvas
	var canvas = engine.render.canvas;
	var context = engine.render.context;
	// analisa o suporte pelo navegador
	if(true){
		//desenha o placar
		context.fillStyle = "#000";
		context.font = "30px Arial";
		context.fillText(player1.placar, 50, 60);
		context.fillText(player2.placar, LARGURA-70, 60);

		// caso o jogo esteja pausado, pede que o usuario pressione espaco
		// removendo isto, faz com que o jogo seja continuo	
		if (estadoAtual == EstadoJogo.PAUSADO) {
			context.fillStyle = "#000";
			context.fillText("Pressione espaco para continuar",300,ALTURA/2);
		}
	}
}



//add a mouse-controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

//Direita
var bordaDireita = Bodies.rectangle(1000, 250, 50, 500, { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1 });
//Esquerda
var bordaEsquerda = Bodies.rectangle(0, 250, 50, 500, { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1 });

World.add(engine.world, [
	/*Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { frictionStatic: 0, isStatic: true, friction: 0, restitution: 1 }),
	Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { frictionStatic: 0, isStatic: true, friction: 0, restitution: 1 }),
	Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { frictionStatic: 0, isStatic: true, friction: 0, restitution: 1 }),
	Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { frictionStatic: 0, isStatic: true, friction: 0, restitution: 1 })*/

	//Topo
	Bodies.rectangle(500, 0, 1000, 50, { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1 }),
	//Baixo
	Bodies.rectangle(500, 500, 1000, 50, { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1 }),
	bordaDireita,
	bordaEsquerda
]);


var bola = Bodies.circle(LARGURA/2, ALTURA/2, 15, { mass: 0.005, inertia: 0, friction: 0, restitution: 1.07,  frictionStatic: 0, frictionAir: 0 });
var player1 = Bodies.rectangle( 50, 250, 20, 100, { inertia: 0, frictionStatic: 1, isStatic: true, frictionAir: 0, friction: 0, restitution: 1 });
var player2 = Bodies.rectangle( 950, 250, 20, 100, { inertia: 0, frictionStatic: 1, isStatic: true, frictionAir: 0, friction: 0, restitution: 1 });
player1.placar = 0;
player2.placar = 0;

// add all of the bodies to the world
World.add(engine.world, [
	bola,
	player1,
	player2
]);

// utiliza o handler do teclado para selecionar qual movimento deve ser efetuado
function moveJogadores() {
	if(Key.isDown(87)){
		Body.setPosition(player1, { x: player1.position.x, y: player1.position.y-5 });
	}
	if(Key.isDown(83)){
		Body.setPosition(player1, { x: player1.position.x, y: player1.position.y+5 });
	}
	if(Key.isDown(Key.ACIMA)){
		Body.setPosition(player2, { x: player2.position.x, y: player2.position.y-5 });
	}
	if(Key.isDown(Key.ABAIXO)){
		Body.setPosition(player2, { x: player2.position.x, y: player2.position.y+5 });
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

// define os estados de jogo possiveis
var EstadoJogo = {
	PAUSADO: 1,
	JOGANDO: 2,
	TERMINADO: 3,
};

var estadoAtual = EstadoJogo.JOGANDO;

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


var colisaoPlayer1 = Matter.Pair.id(bola, player1);
var colisaoPlayer2 = Matter.Pair.id(bola, player2);
var colisaoPontoP1 = Matter.Pair.id(bola, bordaDireita);
var colisaoPontoP2 = Matter.Pair.id(bola, bordaEsquerda);

Events.on(engine, "collisionStart", function(event){
	var pairs = event.pairs;
	for (var i = pairs.length - 1; i >= 0; i--) {
		var pair = pairs[i];
		if(pair.id == colisaoPlayer2){
			pair.bodyA.render.fillStyle = 'red';
			pair.bodyB.render.fillStyle = 'red';
			console.log('colisao P2');
		}

		if(pair.id == colisaoPlayer1){
			pair.bodyA.render.fillStyle = 'green';
			pair.bodyB.render.fillStyle = 'green';
			console.log('colisao P1');
		}

		if(pair.id == colisaoPontoP1){
			player1.placar++;
			reiniciarRodada();
		}

		if(pair.id == colisaoPontoP2){
			player2.placar++;
			reiniciarRodada();
		}
	}
})


// run the engine
Engine.run(engine);

lancarBola();