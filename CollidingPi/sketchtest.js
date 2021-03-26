/*
This is a colliding simulation of a friction less world and a wall with an infinite number of mass.
Idea was from The Coding Train, and made by me.
*/


// Declare All Variables.
let blockImg;
let block1;
let block2;
let text1;
let text2;
let clack;

let count = 0;
var digits;
let countDiv;
var timeList = [1, 1, 5, 41, 415, 4163, 41637, 500000, 5000000, 50000000];
let timeSteps;
var ready = false;


function preload() {
	// preload image and sound
  blockImg = loadImage('block.png');
  clack = loadSound('clack.wav');
}

function setup() {
	// setup canvas, text and other dom elements
  createCanvas(windowWidth, 200);
  countDiv = createDiv(count);
  countDiv.style('font-size', '72pt')
  createP("Set number of pi digits and the timeSteps (recommended default)")
  inp = createInput("");
  inp.input(inpChanged)
  inp1 = createInput("");
  button = createButton("submit");
  button.mousePressed(setReady);
  
}

function inpChanged() {
	inp1.value(getTimeList(this.value()));
}

function getTimeList(digit) {
	// gets the recommended Time List Value
	 if (digit-1 < timeList.length) {
    return (timeList[digit-1]);
  }
  return (5 * (10**digit-3));
}

function setReady() {
	// triggers when pressed button
	// sets up blocks and timeSteps
  digits = inp1.value();
  
  const m2 = pow(100, digits-1);
  block1 = new Block(100, 20, 1, 0, 0);

  size = 20*digits
  if (size > 20*8) {
  	size = 20*8;
  }
  block2 = new Block(300, size, m2, -4/timeSteps, 20);
  count = 0;
  ready = true;
}

function draw(){
	// update and show blocks
  background(200);
  
  if (ready) {
    
    let clackSound = false;


    for (let i = 0; i < timeSteps; i++){
      if (block1.collide(block2)) {
        const v1 = block1.bounce(block2);
        const v2 = block2.bounce(block1);
        block1.v = v1;
        block2.v = v2;
        clackSound = true;
        count++;
      }
      if (block1.hitWall()) {
        block1.reverse();
        clackSound = true;
        count++;
      }

      block1.update();
      block2.update();
    }

    if (clackSound) {
      clack.play();
    }

    block1.show();
    block2.show();
    
    textSize(24);
    
    const x2 = constrain(block2.x, -5/timeSteps, width);
    
    text1 = text(block1.m, block1.x+block1.w/24, block1.y-10)
    text2 = text(block2.m, x2, block2.y-10)


    countDiv.html(nf(count, digits));
    
  }
  
}