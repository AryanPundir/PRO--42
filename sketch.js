
var monkey , monkey_running 
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var Food
var frame , frameImage
var gameState = 1
var END = 0
var PLAY = 1
var health = 2
var healthImg
var life
var life2




function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  frameImage = loadImage("jungle.jpg");
  healthImg = loadImage("life.png")
   
}



function setup() {
 createCanvas(500,500)
  
  FoodGroup= new Group()
  obstacleGroup= new Group();

  
  
  
  frame=createSprite(250,250);
  frame.addImage(frameImage);
  frame.scale=1
 
 monkey=createSprite(30,460,10,10)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1
 
  ground=createSprite(10,495,500,10);
  ground.visible=false
 score=0
  
  life = createSprite(50,30,20,20)
  life.addImage(healthImg)
  life.scale = 0.09
  
    life2 = createSprite(125,30,20,20)
  life2.addImage(healthImg)
  life2.scale = 0.09
  
  
  
}


function draw() {
  background("white");
  //console.log(getFrameRate())
  
  

  if(gameState===PLAY){
    
  ground.velocityX=2
   ground.x=width/2;
  frame.velocityX=-2
  
  if(frame.x<0){
    frame.x=250
  }
  
  
   if(keyDown("space")&& monkey.y>=450){
    monkey.velocityY=-23
   
  }
 
  monkey.velocityY= monkey.velocityY + 0.8
    
     food();
  obstacles();
     
    
     if(FoodGroup.isTouching(monkey)){
    score= score+2
    FoodGroup.destroyEach();
  }
 
  size();
  // console.log(monkey.height); 
 
if(monkey.isTouching(obstacleGroup)&&(health===2)){
  obstacleGroup.destroyEach();
  monkey.scale = 0.09   
  health=1
  life2.visible = false
}
    
 if(monkey.isTouching(obstacleGroup)&&(health===1)){
  gameState = END  
   life.visible = false

}
    
    
 
   monkey.collide(ground);
   
 
 
}
 if(gameState===END){
    monkey.collide(ground);
 ground.velocityX=2
   ground.x=width/2;
monkey.visible=false
  frame.velocityX=0
   obstacleGroup.destroyEach();
   FoodGroup.destroyEach();
   console.log(monkey.height); 
   
  if(keyDown("R")){
    gameState=PLAY
    life.visible = true
    life2.visible = true
    health = 2
    monkey.visible=true
    score=0
     monkey.scale=0.1
  }
 }
  

  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white")
   text("Score= "+score,215,30)
  
   if(gameState===END){
      stroke("Yellow")
   textSize(50);
   fill("Red");
   text("GAME OVER",125,250);
   }
  
     if(gameState===END){
      stroke("Yellow")
   textSize(25);
   fill("Red");
   text("PRESS R TO RESTART",150,290);
   }
  
  
}

function food(){
  
  if(frameCount%120===0){
  var   Food = createSprite(490,200,10,10)
    Food.addImage(bananaImage);
    Food.scale=0.1
     Food.setLifetime=100;
     
 Food.y=Math.round(random(120,200)) 
  Food.velocityX=-4
  
  FoodGroup.add(Food)
  }
}

function obstacles(){
  if(frameCount%300===0){
    var obstacles= createSprite(480,475,10,10);
    obstacles.scale=0.1
    obstacles.addImage(obstaceImage)
    obstacles.velocityX=-3
    obstacleGroup.add(obstacles);
    
  }
  
}

function size (){
  
  switch(score){
    
    case 10 : monkey.scale= 0.11;
      break;
      case 20 : monkey.scale=0.12;
      break;
      case 30 : monkey.scale=0.13;
      break;
      case 40 : monkey.scale=0.14;
      break;
      default: break;
      
      
  }
}
 

  

