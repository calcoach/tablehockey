
var config = {
  type: Phaser.WEBGL,
  parent: 'phaser-example',
  backgroundColor: 008000	,
  width: 1100,
  height: 600,
  physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};



var Game = new Phaser.Game(config);
//var scene = game.scene;
Game.playerMap = {};
var ids  = [];
var score;
var score1;
var score2;
var cont = 0;
var cursor;
var times;
var total;
var timedEvent;
var message;
var barra1;
var barra2;
Game.ball;
var ball_lauched;
var ball_velocity;
var scene;
var physics;


function preload() {
  this.load.image('pared', 'assets/mesa.png');
  this.load.image('barra', 'assets/barra.png');


}

function create() {

  physics = this.physics;
  scene = this;

  var pared = this.add.image(530, 300, 'pared');
  this.physics.world.setBounds(380, 50, 316, 500)
  ball_lauched = false;
  ball_velocity = 250;

  Game.ball = createBall(400, 300, 'barra', this.physics, this);

  //this.input.onDown.add(launch_Ball, this);


  times = this.add.text(1000, 32);
  message = this.add.text(800,32);

  times.setText('Tiempo');

  score = this.add.text(150, 12);
  score.font = "Agency FB";
  score.setFontSize(50);
  score.setFill("green");
  score.setText('SCORE:');

  score1 = this.add.text(150, 52);
  score1.font = "Agency FB";
  score1.setFontSize(90);
  score1.setFill("green");
  score1.setText('0');

  score2 = this.add.text(150, 450);
  score2.font = "Agency FB";
  score2.setFontSize(90);
  score2.setFill("green");
  score2.setText('0');



  timedEvent = this.time.delayedCall(20000, fadePicture, [], this);


  this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

    //gameObject.x = dragX;
    //gameObject.y = dragY;
    Client.sendClick(dragX,dragY);

  });

  this.input.on('dragend', function(pointer, gameObject) {

    gameObject.clearTint();

  // update();
  });
  Client.askNewPlayer();

}


function createBarra(x,y,image, physics, scene) {

  var barra = physics.add.sprite(x, y,image).setInteractive();
  scene.input.setDraggable(barra);
  barra.setCollideWorldBounds(true);

   return barra;

}


Game.addNewPlayer = function(id,x,y){

  Game.playerMap[id] = physics.add.sprite(x, y,'barra').setInteractive();
  scene.input.setDraggable(Game.playerMap[id]);
  Game.playerMap[id].setCollideWorldBounds(true);
  Game.playerMap[id].body.bounce.setTo(1,1);
  Game.playerMap[id].enableBody = true;
  Game.playerMap[id].body.setCircle(15, 10, 10);

  barra2 = Game.playerMap[id];
  ids.push(id);
  physics.world.addCollider(Game.ball,Game.playerMap[id] ,null, null,test(this.physics,Game.playerMap[ids[id]]));
  cont++;

}

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    //var distance = Phaser.Math.distance(player.x,player.y,x,y);
    //var tween = game.add.tween(player);
    //var duration = distance*1;
    //tween.to({x:x,y:y}, duration);
    //tween.start();
    player.x=x;
    player.y=y;
}

Game.moveBall = function(bal){

console.log(bal);

   Game.ball.x = bal.balX;
   Game.ball.y = bal.balY;
   Game.ball.body.velocity.x = bal.balVelocityX;
   Game.ball.body.velocity.y = bal.balVelocityY;


}

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    cont--;
    delete Game.playerMap[id];
};

function createBall(x,y,image, physics, scene){

  var ball0 = physics.add.sprite(x, y,image).setInteractive();
  scene.input.setDraggable(ball0);
  ball0.setCollideWorldBounds(true);
  ball0.body.bounce.setTo(1,1);
  ball0.enableBody = true;

   return ball0;
}

Game.launch_Ball = function(){

  if(ball_lauched){

    ball.x = physics.world.centerX;
    ball.y = physics.world.centerY;
    ball.body.velocity.setTo(0,0);
    ball_lauched = false;
    console.log('jaja');

  } else {

    Game.ball.body.velocity.x = ball_velocity;
    Game.ball.body.velocity.y = -ball_velocity;

  }


}


function fadePicture() {
  total++;
}


function update() {

  times.setText('Tiempo: ' + (timedEvent.getProgress().toString().substr(0, 4) * 30));


 for(x=0; x<cont; x++){

    try{

      if(Game.playerMap[ids[x]].body!==null){
        test(this.physics,Game.playerMap[ids[x]]);

         physics.world.collide(Game.playerMap[ids[x]], Game.ball, test2(), null, scene);
         //console.log(Game.playerMap[ids[x].collider);
         console.log(Game.ball.body.onCollide);
         if(Game.ball.body.checkWorldBounds()){
           var bal = {

             balX: Game.ball.x,
             balY: Game.ball.y,
             balVelocityX: Game.ball.body.velocity.x,
             balVelocityY: Game.ball.body.velocity.y
           }

           Client.sendBall(bal);

         }

      }

      } catch(e){
       console.log(e);
     }

 }

}

function test2(){
  console.log(jujuju);
}

function test(physics, barra){

  try{

  barra.body.velocity.x= 0;
  barra.body.velocity.y=0;
  barra.body.setImmovable(true);
  point1 = Game.ball.x - barra.x;
  point2 = Game.ball.y - barra.y;
  distancia = Math.sqrt(Math.pow(point1,2)+math.pow(point2,2));
  if(distancia < 50.0 ){

      var x = barra.x;
      var y = barra.y;

      Game.ball.body.velocity.x = 250;
      Game.ball.body.velocity.y = -250;

      var bal = {

        balX: Game.ball.x,
        balY: Game.ball.y,
        balVelocityX: Game.ball.body.velocity.x,
        balVelocityY: Game.ball.body.velocity.y
      }

      Client.sendBall(bal);

    }

    } catch (e){

        console.log(e);
    }


}
