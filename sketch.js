var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount=0;
var gameState=0;

var car1, car2;
var cars = [];
var allPlayers;
var car1_img,car2_img, track;
var button;
var fuelImage, powerCoinImage, fuels, powerCoins,obstacle1Image, obstacle2Image,obstacles;
//gameState=0 means waiting for players
//gameState=1 means play state, 2 players have joined and race started
//gameState=2 means player reached the end/ finish line
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1_img = loadImage("./assets/car1.png");
  car2_img = loadImage("./assets/car2.png");
  track = loadImage("./assets/track.jpg");
  button = loadImage("./assets/reset.png");
  fuelImage = loadImage("./assets/fuel.png")
  powerCoinImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/obstacle1.png");
  obstacle2Image = loadImage("./assets/obstacle2.png");
  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  console.log(playerCount)
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  console.log(playerCount)

}

function draw() {
  background(backgroundImage);

  if (playerCount === 2){
    game.update(1);
  }

  if (gameState === 1){
    game.play();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
