import { canvas, ctx, random } from './constants.js';

class Ball {
  constructor() {
    this.radius = 5;
    this.x = random(0, canvas.width - 2 * this.radius);
    this.y = random(-50, 600);
    this.speed = random(5, 11);
    this.momentum = 0;
  }

  gravity() {
    if (this.x != canvas.height) {
      this.speed += 0.3;
    }
  }

  collisionDetection() {
    if (this.y >= canvas.height) {
      this.y = canvas.height;
      this.speed *= -1 / 2;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    // ctx.stroke();
  }

  move() {
    this.y += this.speed;
  }

  fall() {
    this.draw();
    this.collisionDetection();
    this.gravity();
    this.move();
  }
}

export default Ball;
