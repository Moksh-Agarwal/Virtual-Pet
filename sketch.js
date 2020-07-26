//Create variables here
var dog, happyDog, foodS, foodStock;
var dog_img, hap_img;
var database;
function preload()
{
  //load images here
  dog_img= loadImage("images/dogImg.png");
  hap_img= loadImage("images/dogImg1.png");
}

function setup() {
  database= firebase.database();
	createCanvas(600, 600);
  dog= createSprite(300,450);
  dog.addImage(dog_img);
  dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW))
{
  writeStock(foodS);
  dog.addImage(hap_img)
}
  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
text("Food left : "+ foodS, 250,350);
text("Note: Press UP Arrow to feed Drago Milk!!", 140,30);
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=20;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}