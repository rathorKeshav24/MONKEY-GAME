
var monkey , monkey_running;
var banana ,bananaImage,obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 FoodGroup=new Group();
  obstacleGroup=new Group();
}



function setup() {
 createCanvas(670,400);
  score=0;
  survivalTime=0;
  monkey=createSprite(90,370,10,10);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  ground=createSprite(0,400,1500,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);

  obstacleGroup=createGroup();
  bananaGroup=createGroup();

}

function draw(){
  background("green");
  if(keyDown("space")){
    monkey.velocityY=-10;
    
  }
  monkey.velocityY=monkey.velocityY+0.3;
  monkey.collide(ground);
  ground.velocityX=-7
  if(ground.x<0){
  ground.x=ground.width/2;
  }
  
  if(monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach();
    score=score+2;
  }
  spawnFood();
  spawnObstacle()
  
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    ground.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
  fill("white");
  text("score :"+score ,500,50);
  
  fill("black")
  var survaivalTime=Math.round(frameCount/frameRate());
  text("survavival time :"+ survaivalTime,350,50);
  
  
}

function spawnFood(){
  if (frameCount%80===0){
    banana=createSprite(600,250,40,10);
    banana.y=random(120,200);
    banana.velocityX=-5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
      banana.addImage(bananaImage);
     banana.scale=0.05;
     FoodGroup.add(banana);
  }
}
function spawnObstacle() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
     obstacle.lifetime = 300;
      obstacleGroup.add(obstacle);
  }
}