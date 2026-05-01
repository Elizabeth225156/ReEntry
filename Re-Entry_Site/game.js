/*
TO-DO:
- INPUTTING DATA LOGIC
- Move trajectory
- Move spacecraft
- Success or fail
*/


function preload() {
  planet = loadImage('assets/planet.png');
  reentryCraft = loadImage('assets/spacecraft.png');
}

let input;
function setup() {
  createCanvas(windowWidth-31.5, windowHeight-20);
  textAlign(CENTER);
  imageMode(CENTER);
  rectMode(CORNER);
  ellipseMode(CENTER);

  //setup the hitboxes stuff


  //input = createInput("");
  //button = createButton("Submit");
}

let testData = 0; //i have even less idea
let abc = 0; //i have no idea
let infoShow = false; //is it showing the information on the screen?
let gameOn = false; //dont really need this if we have screen
let dataEntered = false; //is the data entered?

let shipData = new Map();
shipData.set("trajectory", 20);
let trajectory = shipData.get("trajectory"); //this is equal to 20
let dataForShip = [1, 2, 3, 4, 5]; //the data values used for the ship. OOH THIS SHOULD BE A MAP


let screen = ["title", "game", "end"]; //which screen of the game they are on

function draw() {
  //need other thingy bc i don't like this way
  if(!gameOn){
    background(0);
    earth();
    spacecraft();
    // inputBox();

    fill(255, 0, 0);
    rect(width-50, 50, 50, 50);

    if(isClicked(width-50, 50, 50, 50)){
      infoShow = true;
    }

    if(infoShow){
      information();
    }
  } else{
    background(0);
    titleScreen();
    if(isClicked(width/2, height/2, width, height) && dataEntered){
      gameOn = true;
    }
  }
 
}

function titleScreen(){
  fill(255);
  text("RE-ENTRY GAME", width/2, height/2);
  text("Enter the data first", width/2, height/2 + 25);
  text("Click anywhere to begin", width/2, height/2 + 50);

  //draw input on the screen. Variable to check which one it should go to.
  //input.position(width/2, height/2 + 125);
  //button.position(input.x + input.width, input.y);
}

function earth(){
  let radius = 350, planetX = width/3, planetY = height/2; //sets the position and size of the earth
  image(planet, planetX, planetY, radius, radius); //draws the earth on the screen
}

let craftX = 0, craftY = 0; //location of the craft

function spacecraft(){
  if(craftX > width || craftY > height){ //if it goes over the boundaries it will go back to the position
    craftX = 0; //THIS IS FOR TESTING
    craftY = 0; //At least I think it is
  }
  fill(100, 100, 100); //idk why we need this here
  image(reentryCraft, craftX, craftY, 30, 30); // draw it

  craftX += 2; //move the craft
  craftY += 3; //this will become a lot more complicated
}

function inputBox(){ //huh
  input.position(width/2, height - 40);
  testData = input.value();
}

function information(){
  //make an outline for where the text goes
  fill(255);
  textSize(15);
  text("Vehicle is going in the direction of Earth's orbit", width - 100, 25);
}

function isClicked(objX, objY, objWidth, objHeight){//this needs to be better
  let leftBorder = objX - objWidth/2;
  let rightBorder = objX + objWidth/2;
  let topBorder = objY - objHeight / 2;
  let bottomBorder = objY + objHeight / 2;
  if(mouseX > leftBorder && mouseX < rightBorder && mouseY > topBorder && mouseY < bottomBorder && mouseIsPressed){
    return true;
  } else{
    return false;
  }
}