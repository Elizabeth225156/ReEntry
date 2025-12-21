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
  rectMode(CENTER);
  input = createInput("");
  button = createButton("Submit");
}

let testData = 0;
let abc = 0;
let infoShow = false;
let gameOn = false;
let dataEntered = false;
let dataForShip = [1, 2, 3, 4, 5];
let screen = ["title", "game", "end"];

function draw() {
  
  if(gameOn){
    background(0);
    earth();
    spacecraft();
    inputBox();

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
  input.position(width/2, height/2 + 125);
  button.position(input.x + input.width, input.y);
}

function keyPressed(){
  //check which screen you are in
  for(let i = 0; i < screen.length()-1; i ++){
    switch(screen[i]){
      case "title":
        //Stuff for entering
        if(keyCode === ENTER){
          dataForShip[0] = 5;//FIIIIIIIIIX
          input.value('');
        }
        break;
      case "game":
        break;
      case "end":
        break;
      default:
        break;
    }
  }
}


function earth(){
  let radius = 350, planetX = width/3, planetY = height/2;
  image(planet, planetX, planetY, radius, radius);
}

let craftX = 0, craftY = 0;

function spacecraft(){
  if(craftX > width || craftY > height){
    craftX = 0;
    craftY = 0;
  }
  fill(100, 100, 100);
  image(reentryCraft, craftX, craftY, 30, 30);

  craftX += 2;
  craftY += 3;
}

function inputBox(){
  input.position(width/2, height - 40);
  testData = input.value();
}

function information(){
  //make an outline for where the text goes
  fill(255);
  textSize(15);
  text("Vehicle is going in the direction of Earth's orbit", width - 100, 25);
}

function isClicked(objX, objY, objWidth, objHeight){
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