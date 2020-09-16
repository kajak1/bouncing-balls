import { canvas, ctx, random } from './constants.js';

class Ball {
  constructor() {
    this.radius = 25;
    this.x = random(200, canvas.width / 2);
    this.y = random(-50, 100);
    this.coords = [this.x, this.y];
    this.speedX = random(1, 10);
    this.speedY = random(5, 20);
    this.collision = false;
    this.onGround = false;
  }

  gravity() {
    if (this.y + this.speedY < canvas.height - this.radius) {
      this.speedY += 0.3;
    }
  }

  collisionDetection() {
    console.log(this.y, canvas.height - this.radius);
    if (this.y + this.speedY >= canvas.height - this.radius) {
      this.y = canvas.height - this.radius;
      this.speedY *= -0.5;
      if (this.speedX < 0.5) {
        this.speedX = 0;
      } else {
        this.speedX *= 0.5;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
  }

  move() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.coords = [this.x, this.y];
  }

  fall() {
    this.draw();
    this.gravity();
    this.collisionDetection();
    this.move();
  }
}

export default Ball;
