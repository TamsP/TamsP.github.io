let r1 = 200;
let r2 = 200;
let m1 = 40;
let m2 = 40;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let a1_a = 0;
let a2_a = 0;
let g = 1;

let pa1_v;
let pa2_v;
let pa1_a;
let pa2_a;

let reseting = false;
let stopped = false;

let px2 = -1;
let py2 = -1;
let cx, cy;

let hsed = false;

let graphics;

function setup() {  
  canvas = createCanvas(windowWidth+50, windowHeight);
  
  reset = createButton("Reset Pendulum Position");
  reset.mousePressed(resetValue);
  
  resetAll = createButton("Reset All");
  resetAll.mousePressed(ResetAll);
  
  stop = createButton("Stop/Unstop Pendulum");
  stop.mousePressed(stopPendulum);
  
  hs = createButton("Hide/Show Pendulum");
  hs.mousePressed(function() { hsed = !hsed });
  
  saveCan = createButton("Save as Image");
  saveCan.mousePressed(function() { saveCanvas(canvas, "Double Pendulum", "jpg") });
  
  arm_1p = createP("Armlength 1: 200");
  arm_1s = createSlider(0, 500, 200);
  arm_1s.input(arm_1c);
  
  arm_2p = createP("Armlength 2: 200");
  arm_2s = createSlider(0, 500, 200);
  arm_2s.input(arm_2c);
  
  mass_1p = createP("Mass 1: 40")
  mass_1s = createSlider(0, 100, 40);
  mass_1s.input(mass_1c);
  
  mass_2p = createP("Mass 2: 40");
  mass_2s = createSlider(0, 100, 40);
  mass_2s.input(mass_2c);
  
  g_p = createP("Gravity: 1");
  g_s = createSlider(0, 10, 1, 0.1);
  g_s.input(g_c);
  
  
  pixelDensity(1);
  cx = width/2;
  cy = 100;
  
  graphics = createGraphics(width, height);
  graphics.background(255);
  graphics.translate(cx, cy);
  
  a1 = PI/2;
  a2 = PI/2;
}

function draw() { 
  
  imageMode(CORNER);
  image(graphics, 0, 0, width, height);
  
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;
  
  
  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;
  
  if (stopped) {
    a1_a = 0;
    a2_a = 0;
  }
  
  
  stroke(0);
  strokeWeight(2);
  
  translate(cx, cy);
  

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);
  
  if (!hsed) {
  
    line(0, 0, x1, y1);
    fill(0);
    ellipse(x1, y1, m1, m1);

    line(x1, y1, x2, y2);
    fill(0);
    ellipse(x2, y2, m2, m2);
  }
  
  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;
  
  // a1_v *= 0.999;
  // a2_v *= 0.999;
  
  if (frameCount > 1) {
    graphics.strokeWeight(1);
    graphics.stroke(0);
    if (!reseting) {
      graphics.line(px2, py2, x2, y2);
    }
  }
  
  px2 = x2;
  py2 = y2;
  
  if (reseting) {
    reseting = false;
  }
}
