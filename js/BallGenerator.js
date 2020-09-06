import Ball from './Ball.js';

class Generator {
  constructor() {
    this.balls = [];
    for (let i = 0; i <= 50; i++) {
      this.balls[i] = new Ball();
    }
    console.log(this.balls);
  }

  draw() {
    for (let el of this.balls) {
      el.fall();
    }
  }
}

export default Generator;
