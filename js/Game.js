class Game {
    constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");

      this.leaderBoardTitle = createElement("h2");
      this.leader1 = createElement("h2");
      this.leader2 = createElement("h2");

      this.playermoving = false;
    }
    
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", data=> {
        gameState = data.val();
        console.log("Game state", gameState)
      });
    }
   
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
   

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();

    car1 = createSprite(width/2 -50, height -100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width/2+50, height -100);
    car2.addImage("car2",car2_img);
    car2.scale = 0.07;

    cars = [car1, car2]; 

    fuels = new Group();
    powerCoins = new Group();
    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];
  

    this.addSprites(fuels, 4, fuelImage, 0.02);

    this.addSprites(powerCoins, 20, powerCoinImage, 0.09);

    this.addSprites(obstacles, obstaclesPositions.length, obstacle1Image, 0.04, obstaclesPositions)
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.position(width/2+200, 40);
    this.resetButton.position(width/2+230, 100);

    this.resetTitle.class("resetText");
    this.resetButton.class("resetButton");

    this.resetTitle.html("Reset Game");

    this.leaderBoardTitle.html("Leaderboard");
    this.leaderBoardTitle.class("resetText");
    this.leaderBoardTitle.position(width/3-40, 40);

    this.leader1.class("leaderText");
    this.leader1.position(width/3 - 30, 80);

    this.leader2.class("leaderText");
    this.leader2.position(width/3 - 30, 140);
  }

handleResetButton(){
  this.resetButton.mousePressed(()=>{
    database.ref('/').set({
      carsAtEnd:0,
      gameState:0,
      playerCount:0,
      players:{}
    });
    window.location.reload();
  })
}

showLeaderBoard(){
  var leader1, leader2;
var players = Object.values(allPlayers);
if (players[0].rank === 0 && players[1].rank=== 0 || players[0] ==1){
  leader1 = players[0].rank + "&emsp;" +players[0].name + "&emsp;" + players[0].score;
  leader2 = players[1].rank + "&emsp;" +players[1].name + "&emsp;" + players[1].score;
}

if ( players[1].rank=== 1 ){
  leader2 = players[0].rank + "&emsp;" +players[0].name + "&emsp;" + players[0].score;
  leader1 = players[1].rank + "&emsp;" +players[1].name + "&emsp;" + players[1].score;
}

this.leader1.html(leader1);
this.leader2.html(leader2)
}

  play(){
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined){

    

      image(track, 0, -height*5, width, height*6)
        this.showLeaderBoard();
        this.showLife();
        this.showFuelBar();
        var index = 0;

        for (var plr in allPlayers){
          index = index +1;  
          var x = allPlayers[plr].positionX;
          var y = height - allPlayers[plr].positionY;

          cars[index-1].position.x = x;
          cars[index - 1].position.y = y;

          if (index === player.index){
            fill("red");
            ellipse(x,y, 60,60)

            this.handleFuel(index);
            this.handlePowerCoins(index);

            camera.position.y = cars[index-1].position.y;
            camera.position.x = cars[index-1].position.x;
          }
}
      this.handlePlayerControls();

      const finishLine = height*6 -100;
      
      if (player.positionY > finishLine){
        gameState = 2;
        player.rank +=1;
        Player.updateCarsAtEnd(player.rank);
        player.update();
        this.showRank();
      }


      drawSprites();
    }
   
  }

  handlePlayerControls(){
    if (keyIsDown(UP_ARROW)){
      this.playermoving = true
      player.positionY += 10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.positionX > width/3){
      player.positionX -= 10
      player.update
    }
    if(keyIsDown(RIGHT_ARROW) && player.positionX < width/2 +200){
      player.positionX += 10
      player.update
    }
  }

  handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });

    // Reducing Player car fuel
    if (player.fuel > 0 && this.playerMoving) {
      player.fuel -= 0.3;
    }

    if (player.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }

  handlePowerCoins(index){
    cars[index-1].overlap(powerCoins, function(collector, collected){
      player.score += 20;
      player.update();
      collected.remove();
    });

    if (player.fuel > 0 && this.playermoving){
      player.fuel -= 0.3;
    }

    if (player.fuel <=0){
      gameState = 2;
      this.gameOver();
    }
  }

  showRank(){
    swal({
    title: `Awesome!${"\n"}Rank ${"\n"}${player.rank}`,
    text:"You reached finish line",
    imageUrl:
    "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize :"100x100",
    confirmButtonText :"Ok"
    })
  }

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  showLife(){
    push();
    fill("white")
    rect(width/2 -100, height-player.positionY-300, 185, 20);
    fill("red");
    rect(width/2 -100, height-player.positionY-300, player.life, 20)
    pop();
  }

  showFuelBar(){
    push();
    fill("white")
    rect(width/2 -100, height-player.positionY-200, 185, 20);
    fill("yellow");
    rect(width/2 -100, height-player.positionY-200, player.life, 20)
    pop();
  }
}