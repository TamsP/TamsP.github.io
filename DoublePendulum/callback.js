function ResetAll() {
  resetValue();
  
  r1 = 200;
  arm_1p.html("Armlength 1: " + r1);

  r2 = 200;
  arm_2p.html("Armlength 2: " + r2);

  m1 = 40;
  mass_1p.html("Mass 1: " + m1);

  m2 = 40;
  mass_2p.html("Mass 2: " + m2);

  g = 1;
  g_p.html("Gravity: "+g);
}

function resetValue() {
  stopped = false;
  reseting = true;
  a1 = PI/2;
  a2 = PI/2;
  a1_v = 0;
  a2_v = 0;
  a1_a = 0;
  a2_a = 0;
  px2 = -1;
  py2 = -1;
  graphics.background(255);
  
}

function stopPendulum() {
  if (!stopped) {
    
    pa1_v = a1_v;
    pa2_v = a2_v;
    pa1_a = a2_a;
    pa2_a = a2_a;
    
    a1_v = 0;
    a2_v = 0;
    a1_a = 0;
    a2_a = 0;
    
    stopped = true;
  } else {
    a1_v = pa1_v;
    a2_v = pa2_v;
    a1_a = pa2_a;
    a2_a = pa2_a;
    
    stopped = false;
  }
}

function arm_1c() {
  r1 = this.value();
  arm_1p.html("Armlength 1: " + r1);
}

function arm_2c() {
  r2 = this.value();
  arm_2p.html("Armlength 2: " + r2);
}

function mass_1c() {
  m1 = this.value();
  mass_1p.html("Mass 1: " + m1);
}

function mass_2c() {
  m2 = this.value();
  mass_2p.html("Mass 2: " + m2);
}

function g_c() {
  g = this.value();
  g_p.html("Gravity: "+g);
}