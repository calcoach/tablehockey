var Match = {};
var contScore1 = 0;
var contScore2 = 0;

Match.checkAnotation = function(score1, score2, scene){

 console.log(Game.ball.x + ' '+ Game.ball.y);
  for( i = 0; i< Game.cont; i++){


    if(Game.ball.x >= 487 & Game.ball.x <=616 & Game.ball.y>=530  ){

        contScore1++;
        score1.setText(contScore1);
    }

    //this.physics.world.setBounds(380, 50, 316, 500)
    //497 /616   y 70
    // 497 /636  y 532
  }
};
