var gameState="play";
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var Score;
var score;
var SurvivalTime = 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

score = 0;  

bananaGroup = new Group();
obstacleGroup = new Group();
  
monkey = createSprite(80, 315, 20, 20);
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.1;
  
ground = createSprite(400, 350, 900, 10);
console.log(ground.x);
  
banana = createSprite(430, 315, 20, 20);
banana.addImage(bananaImage);
banana.scale=0.1;
banana.velocityX=-8;
  
obstacle = createSprite(430, 315, 20, 20);
obstacle.addImage(obstacleImage);
obstacle.scale=0.1;
obstacle.velocityX=-5;
obstacle.setCollider("rectangle", 0, 0, 375, 400);

}


function draw() {
createCanvas=(400, 400)
background("black");


  
if(gameState==="play") {
  
fill("white");
textSize(20);
text("Score = "+ score, 20, 20);

if(monkey.isTouching(bananaGroup)) {
bananaGroup.destroyEach();
score=score+1;
}
  
if(monkey.isTouching(banana)) {
banana.destroy();
score=score+1;
}

if(keyDown("space")&&monkey.y>310) {
monkey.velocityY=-14;
}

monkey.velocityY=monkey.velocityY+0.8;
console.log(monkey.y);
monkey.collide(ground);
  
if(monkey.isTouching(obstacleGroup)||monkey.isTouching(obstacle)) {
gameState="end";
} 
 
spawnBanana();
spawnObstacle();

stroke("white");
textSize(20);
fill("white");
text("Score: "+ Score, 500, 50);
  
stroke("black");
textSize(20);
fill("white");
survivalTime=Math.ceil(frameCount/frameRate());
text("Survival Time: "+ survivalTime, 100, 50);
}
drawSprites();
  
if(gameState==="end") {
monkey.velocityY=+10;
obstacle.visible=false;
obstacleGroup.destroyEach();
bananaGroup.destroyEach();
ground.visible=false;
fill("red");
textSize(20);
textAlign(CENTER);
text("YOU LOST GAME OVER", 200, 200);


}

}

function spawnBanana() {
if(World.frameCount%80===0) {
banana = createSprite(430, 255, 20, 20);
banana.addImage(bananaImage);
banana.scale=0.1;
banana.y=Math.round(random(200,315));
banana.velocityX=-8;
banana.setLifetime=15;
bananaGroup.add(banana);
}
}

function spawnObstacle() {
if(World.frameCount%300===0) {
obstacle = createSprite(430, 315, 20, 20);
obstacle.addImage(obstacleImage);
obstacle.scale=0.1;
obstacle.velocityX=-8;
obstacle.setLifetime=100;
obstacleGroup.add(obstacle);
obstacle.setCollider("rectangle", 0, 0, 375, 400);
}
}


