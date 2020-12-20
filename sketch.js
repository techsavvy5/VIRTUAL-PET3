var dog,happydog;
var database;
var foodS,foodStock;
var dogImage,dogImage1;
var fedTime,lastFed;
var feed,addFood;
var foodObject;
function preload()
{
  dogImage=loadImage("images/dogImg.png");
  dogImage1=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  
  foodObject=new Food();
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  feed=createButton("feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
foodObject.display();
fedTime=database.ref("Feed Time");
fedTime.on("value",function(data){
  lastFed=data.val();
})
  fill(255,255,254);
  textSize(14);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12 +" PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30);
  }else{
    text("Last Feed :"+lastFed+"AM",350,30);
  }
  drawSprites();
  
}

function readStock(data){
  foodS=data.val();
  foodObject.update(foodStock);
}

function feedDog(){
  dog.addImage("images/dogImg1.png");
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })}