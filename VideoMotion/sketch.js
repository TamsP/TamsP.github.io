/*
This is a Video Capture File made by me, idea
from Daniel Shiffman.

Just Play with it nd have fun!
*/

var video;
var button;
var snapshots = [];
var counter = 0;
var total = 44;
var show = false;
var go = false;

function setup() {
  // P5 Setup function
  
  // Create Dom Elements
  createCanvas(640, 300);
  background(51);
  
  button = createButton("Hide / Show Video")
  button.mousePressed(toggleVideo)
  
  video = createCapture(VIDEO, ready);
  video.size(640, 240)
  video.hide();
}

function toggleVideo() {
  // Triggers when pressed button
  if (show) {
    video.hide();
    show = false
  } else {
    video.show();
    show = true;
  }
}

function ready() {
  // Checks if Video is ready
  go = true;
}

function draw() {
  // P5 Draw Function
  
  // Checks if Video is ready
  if (go) {
    snapshots[counter] = video.get();
    counter++;
    if (counter > total) {
      counter = 0;
    }
  }
  
  // Creates The Images in the Canvas
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;
  
  for (var i = 0; i < snapshots.length; i++) {
    var index = (i + frameCount) % snapshots.length;
    image(snapshots[index], x, y, w, h);
    x = x + w;
    
    if (x > width) {
      x = 0;
      y += h;
    }
    
  }
  
  
}