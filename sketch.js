var dog,dogImg, happyDog,database,foodS,foodStock;
var bedroom,garden,washroom,livingroom;
var milk,milkImg;

var gameState;
function preload()
{
	dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/washroom.png");
  bedroom=loadImage("images/Bed Room.png");
  milkImg = loadImage("images/milk.png");
  livingroom = loadImage("images/Living Room.png");

}

function setup() {
  database = firebase.database();  
	createCanvas(500, 500);
 

  foodObj=new Food();
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

 

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  milkBottle1 = createSprite(140,435,10,10);
  milkBottle1.addImage(milkImg);
  milkBottle1.scale = 0.025;

  milkBottle2 = createSprite(210,280,10,10);
  milkBottle2.addImage(milkImg);
  milkBottle2.scale = 0.025;
  milkBottle2.visible = false;

}


function draw() {  
  background("yellow"); 
 
foodObj.display();
writeStock(foodS);

if(foodS == 0){
  dog.addImage(happyDog);
  milkBottle2.visible=false;
}else{
  dog.addImage(dogImg);
  milkBottle2.visible=true;
}

var gameStateRef=database.ref('gameState');
gameStateRef.on('value',function(data){
  gameState = data.val();
});

if(gameState===1){
  dog.addImage(happyDog);
  dog.scale=0.175;
  dog.y=250;
}
if(gameState===2){
  dog.addImage(dogImg);
  dog.scale=0.175;
  milkBottle2.visible=false;
  dog.y=250;
}

var Bath=createButton("I want to take bath");
Bath.position(500,125);
if(Bath.mousePressed(function(){
  gameState=3;
  database.ref("/").update({'gameState':gameState });
}));
if(gameState===3){
  dog.addImage(washroom);
  dog.scale=1;
  milkBottle2.visible=false;
}

var Sleep=createButton("I am very sleepy");
Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var Play=createButton("Lets play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkBottle2.visible=false;
  }
  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);
 
}

function readStock(data){
  foodS = data.val();
  
}


function writeStock(x){
  database.ref('/').update({
    food:x
  })
}

 