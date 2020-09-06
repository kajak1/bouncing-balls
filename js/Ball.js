import { canvas, ctx, random } from './constants.js';

class Ball {
  constructor() {
    this.radius = 20;
    this.x = random(0, canvas.width - 2 * this.radius);
    this.y = random(-50, 600);
    this.speed = random(10, 20);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
  }

  move() {
    this.y += this.speed;
  }

  fall() {
    this.draw();
    this.move();
  }
}

export default Ball;
