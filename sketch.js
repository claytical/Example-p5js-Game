var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var player;
var coin;
var enemies;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = WAITING;
}

function draw() {
  if(gameState == WAITING) {
    text("PRESS KEY TO PLAY", width/2, height/2);  
  }
  else if(gameState == PLAYING_GAME) {
    background(255);
    //text("PLAYING GAME", width/2, height/2);
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies.get(i);
      enemy.attractionPoint(.2, player.position.x, player.position.y);
    }
    player.overlap(coin, collect);
    enemies.overlap(player, dead);
    drawSprites();
  }
  else if (gameState == GAME_OVER) {
    text("GAME OVER", width/2, height/2);
  }
}
function dead(collector, collected) {
  collected.remove();
  collector.clear();
  gameState = GAME_OVER;
}

function collect(collector, collected) {
    collected.remove();
    score++;
    coin = createSprite(random(width), random(height), 10, 10);

}

function keyPressed() {
  if(gameState == WAITING) {
    startGame();
  }
  else if (gameState == PLAYING_GAME) {
    if(keyCode == UP_ARROW) {
      //MOVE UP
      player.setSpeed(5, 270);
    }
    if (keyCode == DOWN_ARROW) {
      //MOVE DOWN
      player.setSpeed(5, 90);
    }
    if (keyCode == LEFT_ARROW) {
      //MOVE LEFT
      player.setSpeed(5, 180);

    }
    if (keyCode == RIGHT_ARROW) {
      //MOVE RIGHT
      player.setSpeed(5, 0);
    }
    
    
  }
  else if (gameState == GAME_OVER) {
    
  }
}
  
function startGame() {
    gameState = PLAYING_GAME;
    score = 0;
    //CREATE THE PLAYER
    player = createSprite(width/2, height/2, 30, 30);
    //CREATE SOME ENEMIES
    enemies = new Group();
    for (var i = 0; i < 3; i++) {
      var newEnemy = createSprite(random(width), random(height), 20, 20);
      enemies.add(newEnemy);
    }
    //CREATE THE COIN
    coin = createSprite(random(width), random(height), 10, 10);
  
}
  
  
  
  
  
  