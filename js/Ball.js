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
    // console.log(this);
  }

  updateCoords() {}

  gravity() {
    if (this.y != canvas.height - this.radius) {
      this.speedY += 0.3;
    }
  }

  collisionDetection() {
    if (this.y >= canvas.height - this.radius) {
      this.collision = true;
      this.y = canvas.height - this.radius;
      this.speedY *= -0.5;
      if (this.speedX < 0.5) {
        this.speedX = 0;
      } else {
        this.speedX *= 0.5;
      }
    } else {
      this.collision = false;
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
    this.collisionDetection();
    this.gravity();
    this.move();
  }
}

export default Ball;
