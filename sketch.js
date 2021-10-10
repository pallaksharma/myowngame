var bg1;
var bg;
var man,manImg;
var ground;
var cactus1img,cactus2img;
var cactus;
var r;
var waterimg;
var obstaclesG,waterG;
var gameState="PLAY";
var gameOver,gameoverImg;
var points=0;
var girlstopImg;

function preload(){
  bg1=loadImage("bg3.jpg");
  manImg=loadAnimation("g1.png","g2.png","g3.png");
  cactus1img=loadImage("cactus1.png");
  cactus2img=loadImage("cactus2.png");
  waterimg=loadImage("water.png");
  gameoverImg=loadImage("gameover.png");
  girlstopImg=loadAnimation("g3.png");
  
  
}




function setup(){
   createCanvas(600,300);
  bg=createSprite(300,150);
  bg.addImage(bg1);
  bg.scale=1.5;
  bg.velocityX=-4;
  
  man=createSprite(70,10);
  man.width=20;
  man.height=20;
  man.addAnimation("running",manImg);
  man.addAnimation("stopping",girlstopImg);
  man.scale=0.36;
  
  ground=createSprite(300,300,600,10);
  ground.visible=false;
  
  ground.debug=true
  
  obstaclesG=createGroup()
  waterG=createGroup();
  
  gameOver=createSprite(300,150);
  gameOver.addImage(gameoverImg);
  gameOver.scale=0.5
  
  //man.debug=true;
  //man.setCollider("circle",0,0,750)
  
  
  
  
}

function draw(){
  background("pink");
  if(gameState==="PLAY"){
   
    if(keyDown("space")&&man.y>80){
      man.velocityY=-8;
  
  }
    man.velocityY=man.velocityY+0.8;  
  
  spawnObstacles();
  spawnWater();
  if(obstaclesG.isTouching(man)){
    gameState="END"
  }
    gameOver.visible=false;
    for(var i=0;i< waterG.length;i++){
      if(waterG[i].isTouching(man)){
      points=points+5
      waterG[i].destroy()
      
    }
    }
    
    
  }
  else if(gameState==="END"){
    ground.velocityX=0;
    bg.velocityX=0;
    obstaclesG.setLifetimeEach(-1);
    waterG.setLifetimeEach(-1);
    obstaclesG.setVelocityXEach(0);
    waterG.setVelocityXEach(0);
    gameOver.visible=true;
    man.velocityY=0;
    man.changeAnimation("stopping");
    
    }
  
  
  man.collide(ground);
   if(bg.x<130){
    bg.x=450;
  }
  
  
  
  drawSprites();
  textSize(20);
  fill("black");
  text("points: "+points,500,40)
  
}
function spawnObstacles(){
    if(frameCount%135===0){
       cactus=createSprite(580,240,10,10);
       cactus.velocityX=-4;
      r=Math.round(random(1,2));
      if(r===1){
        cactus.addImage(cactus1img);
        cactus.scale=0.4;
         }
      else{
        cactus.addImage(cactus2img);
        cactus.scale=0.5;
        }
      obstaclesG.add(cactus);
      }
  
  }
function spawnWater(){
    if(frameCount%78===0){
       water=createSprite(580,random(30,200),10,10);
       water.velocityX=-4;
      water.addImage(waterimg);
      water.scale=0.2;
      waterG.add(water);
    }
  }