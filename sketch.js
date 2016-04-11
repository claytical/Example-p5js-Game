var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var player;
var coin;


var enemies;

var quarter;
var penny;
var enemy_sprite_sheet;
var enemy_fighting_sprite_sheet;
var enemy_animation;
var enemy_fighting_animation;

function preload() {
  //123x112 for soldier sprite sheet
  enemy_sprite_sheet = loadSpriteSheet('images/solider_stand.png', 123, 112, 8);
  enemy_fighting_sprite_sheet = loadSpriteSheet('images/fighting.png', 124, 116, 10);
  quarter = loadImage("images/quarter.jpg");
  penny = loadImage("images/penny.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = WAITING;
}

function draw() {
  if(gameState == WAITING) {
    background(255);
    fill(0);
    text("PRESS KEY TO PLAY", width/2, height/2);  
  }
  else if(gameState == PLAYING_GAME) {
    background(255);
    //text("PLAYING GAME", width/2, height/2);
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies.get(i);
      enemy.attractionPoint(.02, player.position.x, player.position.y);
    }
    player.overlap(coin, coinCollect);
    enemies.overlap(player, dead);
    drawSprites();
    fill(0);
    text(score, 20,20);
  }
  else if (gameState == GAME_OVER) {
    background(0);
    fill(255);
    text("GAME OVER", width/2, height/2);
  }
}
function dead(collector, collected) {
  //allSprites is a p5play system variable, we clear everything out
  allSprites.clear();
  gameState = GAME_OVER;
}

function coinCollect(collector, collected) {
    collected.remove();
    //since we assigned the points attribute to all of our coins
    //we know we can access it here
    score+= collected.points;
    generateCoin();
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
    gameState = WAITING;
  }
}
  
function startGame() {
    gameState = PLAYING_GAME;
    score = 0;
    //CREATE THE PLAYER
    player = createSprite(width/2, height/2, 30, 30);
    enemy_animation = loadAnimation(enemy_sprite_sheet);
    enemy_fighting_animation = loadAnimation(enemy_fighting_sprite_sheet);
    //CREATE SOME ENEMIES
    enemies = new Group();
    for (var i = 0; i < 3; i++) {
      var newEnemy = createSprite(random(width), random(height), 20, 20);
      newEnemy.addAnimation("stand", enemy_animation);
      newEnemy.addAnimation("fight", enemy_fighting_animation);
      newEnemy.changeAnimation("fight");
      enemies.add(newEnemy);
    }
    generateCoin();
  
}
  
function generateCoin() {
    //CREATE THE COIN
    //points doesn't exist as an attribute of the Sprite class
    //I add it on the fly here.
    var s = random(0,50);
    if (s > 25) {
      coin = createSprite(random(width), random(height), 10, 10);
      coin.points = 25;
      coin.addImage(quarter);
    }
    else {
      coin = createSprite(random(width), random(height), 25, 25);
      coin.points = 1;
      coin.addImage(penny);
    }

}
  
  
  
  