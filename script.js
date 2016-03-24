// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: {
    options: {
      wireframes: false,
      showAngleIndicator: true
    }
  }
});

// gravity init
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

//add a mouse-controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

// add boundaries
var offset = 5;
World.add(engine.world, [
  Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { frictionStatic: 0, isStatic: true, friction: 0, restitution: 1 }),
  Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { frictionStatic: 0, isStatic: true, friction: 0, restitution: 1 }),
  Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { frictionStatic: 0, isStatic: true, friction: 0, restitution: 1 }),
  Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { frictionStatic: 0, isStatic: true, friction: 0, restitution: 1 })
]);


var bola = Bodies.circle(500, 500, 15, { inertia: 0, friction: 0, restitution: 1, frictionAir: 0 });
var bola2 = Bodies.circle(500, 500, 15, { inertia: 0, friction: 0, restitution: 1, frictionAir: 0 });
var player1 = Bodies.rectangle( 100, 100, 20, 100, { inertia: 0, frictionStatic: 0.01, isStatic: true, friction: 0, restitution: 1 });
var player2 = Bodies.rectangle( 700, 500, 20, 100, { inertia: 0, frictionStatic: 0.01, isStatic: true, friction: 0, restitution: 1 });

// add all of the bodies to the world
World.add(engine.world, [
  bola,
  bola2,
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

Matter.Events.on(engine, 'afterUpdate', function(){
  moveJogadores();
});

// run the engine
Engine.run(engine);