var Match = {};
var contScore1 = 0;
var contScore2 = 0;
var corrector1 = false;

Match.checkAnotation = function(score1, score2, scene){

 console.log(Game.ball.x + ' '+ Game.ball.y);
  for( i = 0; i< Game.cont; i++){


    if(Game.ball.x >= 487 & Game.ball.x <=616 & Game.ball.y>=531  ){

        contScore1++;
        score1.setText(contScore1);
        corrector1 = true;
    }  else if((Game.ball.x <= 487 & Game.ball.x >=616 & Game.ball.y<=530 )){
         corrector1 = false;
    }

    if (Game.ball.x >= 487 & Game.ball.x <=616 & Game.ball.y<=70){

      contScore2++;
      score2.setText(contScore2);
    }

    if(score1>10){
      score1.setText("WINNER");
      Game.bal.body.velocity.x=0;
      Game.bal.body.velocity.y=0;
    } else if(score2<10){
      score1.setText("WINNER");
      Game.bal.body.velocity.x=0;
      Game.bal.body.velocity.y=0;
    }

    //this.physics.world.setBounds(380, 50, 316, 500)
    //497 /616   y 70
    // 497 /636  y 532
  }
};
