// this is a class for blocks

class Block {
  constructor(x, w, m, v, xC) {
    // set up variables
    this.x = x;
    this.y = height - w;
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConst = xC;
  }
  
  hitWall() {
    // check if hit wall
    return (this.x <= 0);
  }
  
  reverse() {
    // reverse the velocity
    this.v *= -1;
  }
  
  collide(other) {
    // check for collision
    return !(this.x + this.w < other.x ||
             this.x > other.x + other.w);
  }
  
  bounce(other) {
    // calculate bounce force with math
    let sumM = this.m + other.m;
    let newV = (this.m-other.m)/sumM * this.v;
    newV += (2 * other.m / sumM) * other.v;
    return newV;
  }
  
  update() {
    // update x
    this.x += this.v;
  }
  
  show() {
    // show block image    
    const x = constrain(this.x, this.xConst, width);
    image(blockImg, x, this.y, this.w, this.w);
  }
}