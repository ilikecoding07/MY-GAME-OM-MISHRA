var boy,boy_running,boy_collided
var groundImage
var invisibleGround
var bird_flying
var obstaclesGroup, obstacle1, obstacle2, obstacle3 
var score=0
var PLAY=0
var END=1
var gameState=PLAY
var gameOverImg,restartImg
var jumpSound,dieSound


    function preload(){
    groundImage=loadImage("ground.jpg")

    boy_running=loadAnimation("boy1.png","boy2.png","boy3.png")

    bird_flying=loadImage("bird.png")

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");

    boy_collided = loadAnimation("boy_collided.png")

    gameOverImg = loadImage("gameOver.png")
    restartImg  = loadImage("restart.png")

    jumpSound = loadSound("jumpsound.mp3")
    dieSound = loadSound("die.mp3")
 
    }
    function setup(){
    createCanvas(400,200)

    ground=createSprite(210,100,600,10)
    ground.addImage(groundImage)

    boy=createSprite(50,140,20,40)
    boy.addAnimation("running",boy_running)
    boy.addAnimation("collided",boy_collided)
    boy.scale=0.15

    gameOver=createSprite(200,70,20,20)
    gameOver.addImage("gameOver",gameOverImg)
    gameOver.scale=0.5

    restart=createSprite(200,150,20,20)
    restart.addImage("restart",restartImg)
    restart.scale=0.3

    invisibleGround=createSprite(210,160,420,10)
    invisibleGround.visible=false

    obstaclesGroup = new Group()
    birdGroup= new Group()

    boy.setCollider("circle",0,0,170)
    boy.debug=false




    }
    function draw(){
    background(180)
    console.log("this is ",gameState) 


    if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false


    ground.velocityX=-5


    score=score+Math.round(getFrameRate()/60)
    

    if(keyDown("space")&& boy.y >= 100){
    boy.velocityY=-7
    jumpSound.play()
    }

    spawnobstacles()
    spawnBirds()
  
  
    boy.velocityY=boy.velocityY +0.5
  
    if(ground.x<0){
    ground.x=ground.width/2
    }





    if(obstaclesGroup.isTouching(boy)){
    dieSound.play()
    gameState = END;
    boy.velocityY=0
    }

  

  
    }
    else if (gameState===END){
      gameOver.visible = true
      restart.visible = true

      ground.velocityX=0
      

  
    obstaclesGroup.setLifetimeEach(-1);
    birdGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    birdGroup.setVelocityXEach(0);

    boy.changeAnimation("collided",boy_collided)

    }


    boy.collide(invisibleGround)




    drawSprites()
    textSize(15)
    fill("black")
    text("Score:"+score,300,20)

    }

    function spawnBirds(){
    if(frameCount%300===0){
    bird=createSprite(600,40,20,10)
    bird.addImage(bird_flying)
    bird.scale=0.1
    bird.velocityX=-8
    bird.lifetime = 198
    bird.y=Math.round(random(10,40))
    }
 
    }

    function spawnobstacles(){
    if(frameCount%60===0){
    var obstacle = createSprite(600,140,10,40);
    obstacle.velocityX = -5;
    obstacle.y=Math.round(random(140,120))

    var rand = Math.round(random(1,3));
    switch(rand) {
    case 1: obstacle.addImage(obstacle1);
              break;
    case 2: obstacle.addImage(obstacle2);
              break;
    case 3: obstacle.addImage(obstacle3);
              break;            
    }
    obstacle.scale = 0.15;
    obstacle.lifetime = 298;

    obstaclesGroup.add(obstacle)
    }
    }

