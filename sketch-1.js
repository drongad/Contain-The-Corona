const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var coronavirus, coronavirusAnimation
var backgroundIMG
var doctor
var ground
var resetIMG, reset
var vaccine,vaccineIMG, vaccine1
var vaccineGroup,coronaGroup
var gameState = 0 
var play = 1
var serve = 0
var score = 10

function preload(){
  coronavirusAnimation = loadAnimation("coronavirus1.png","coronavirus1.png","coronavirus2.png","coronavirus2.png")
  backgroundIMG = loadImage("images-1.jpg"),
  vaccineIMG = loadImage("Vaccine.png")
  resetIMG = loadImage("resetButton.png")
}

function setup() {
  createCanvas(800,500);
  engine = Engine.create();
  world = engine.world;
  vaccine = createSprite(200,370,20,15)
  vaccine.addImage(vaccineIMG)


  doctor = new Doctor(50,100,200,150)
  
  vaccineGroup = new Group()
  coronaGroup = new Group()

  ground = new Ground(200,280,1000,20)

  reset = createImg("resetButton.png")
  reset.position(740,20)
  reset.class("resetbutton")
  reset.mouseClicked(Reset)
  reset.size(40,40)
  
  gameState = 0

  
}


function draw() {
  background(backgroundIMG);
  Engine.update(engine);
  
if(gameState === 1){
  

 

  

 
  
 
  if(keyDown("up") && vaccine.rotation >= -25){
    vaccine.rotation -= 5
  }
  if(keyDown("down")&&vaccine.rotation<=0){
    vaccine.rotation+=5
  }
  if(keyDown("space")){
    vaccine1 = createSprite(vaccine.position.x,vaccine.position.y,20,20)
    vaccine1.addImage(vaccineIMG)
    vaccine1.scale = 0.3
    vaccine1.rotation = vaccine.rotation
    vaccineGroup.add(vaccine1)       
    if(vaccine.rotation === 0){
      vaccine1.velocityX = 6
    }
    if(vaccine.rotation === -5){
      vaccine1.velocityX = 8
      vaccine1.velocityY = -1
    }
    if(vaccine.rotation === -10){
      vaccine1.velocityX = 9
      vaccine1.velocityY = -2
    }
    if(vaccine.rotation === -15){
      vaccine1.velocityX = 7
      vaccine1.velocityY = -2
    }
    if(vaccine.rotation === -20){
      vaccine1.velocityX = 8
      vaccine1.velocityY = -3
    }
    if(vaccine.rotation <= -25){
      vaccine1.velocityX = 7
      vaccine1.velocityY = -3
    }

   
      
    }
   
    if(vaccineGroup.isTouching(coronaGroup)){
      coronaGroup.destroyEach()
      score+=1
    }
    
  
   
 
  spawnCorona()
  drawSprites()
  console.log(frameCount)
 
  doctor.display()
  ground.display()
  fill("black")
  textSize(30)
  text("Score: "+score,100,40)
}
 if(frameCount>= 2000 && score >=0){
    score = 1
    coronaGroup.destroyEach()
    textAlign(CENTER)
    fill("blue")
    text("YOU WIN",400,100)
    text("Containing the spread of COVID-19 is hard",400,150)
    text("but through vaccines, we sure can help!",400,200)
    text("do your part, get VACCINATED!",400,250)
  
    
    
  }
  if( score <0){
    
    coronaGroup.destroyEach()
    score = -1
    textAlign(CENTER)
    fill("blue")
    text("YOU lose",400,100)
    text("Containing the spread of COVID-19 is hard",400,150)
    text("but through vaccines, we sure can help!",400,200)
    text("do your part, get VACCINATED!",400,250)
    reset.visible = true
    
  }
  if(gameState === 0){
    textAlign(CENTER)
    textSize(18)
    fill("blue")
    text("Instructions: Contain COVID",400,100)
    text("If you can keep uour score above 0",400,150)
    text("for 1 minute",400,200)
    text("YOU WIN!",400,250)
    text("Press R to continue",400,300)
    if(keyDown("r")){
      gameState = 1
    }

  }

  
}

function spawnCorona(){
  if(frameCount%50 === 0){
    coronaGroup.add(coronavirus = createSprite(random(600,650,500,550), random(200,350,300,320,250,270))) 
    coronavirus.addAnimation("corona",coronavirusAnimation)
    coronavirus.scale = 0.3
    coronavirus.velocityX = -3
    coronavirus.lifetime = 320

    if(coronavirus.x>20){
      score -= 1
    }

    
  
  }
}
function Reset(){
  window.location.reload()
}


