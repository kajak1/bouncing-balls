import { canvas, ctx, distBetweenAB, random, ballRadius } from './constants.js';

class Ball {
  constructor(index) {
    this.index = index;
    this.radius = ballRadius;
    this.x = random(0, canvas.width);
    this.y = random(26, 100);
    this.coords = [this.x, this.y];
    this.speedX = random(-10, 10);
    this.speedY = random(-10, 10);
    this.collision = false;
  }

  gravity() {
    if (this.y + this.speedY < canvas.height - this.radius) {
      this.speedY += 0.4;
    }
  }

  slow() {
    console.log(this.speedX, this.speedY);
    this.speedX *= 0.99;
    this.speedY *= 0.99;
  }

  collisionWithEdges() {
    // if (this.y + this.speedY >= canvas.height - this.radius) {
    if (this.y >= canvas.height - this.radius) {
      this.y = canvas.height - this.radius;
      this.speedY *= -1;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.speedY *= -1;
    }

    if (this.x <= this.radius) {
      this.x = this.radius;
      this.speedX *= -1;
    }

    if (this.x >= canvas.width - this.radius) {
      this.x = canvas.width - this.radius;
      this.speedX *= -1;
    }
  }

  checkCollisionWithBall(otherBall) {
    const distance = distBetweenAB(this.coords, otherBall.coords);
    return distance <= 50;
  }

  handleCollision(otherBall) {
    const distance = distBetweenAB(this.coords, otherBall.coords);
    const overlap = 0.5 * (distance - this.radius * 2);
    this.x -= (overlap * (this.x - otherBall.x)) / distance;
    this.y -= (overlap * (this.y - otherBall.y)) / distance;

    otherBall.x += (overlap * (this.x - otherBall.x)) / distance;
    otherBall.y += (overlap * (this.y - otherBall.y)) / distance;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
  }

  update() {
    console.log(this.speedX, this.speedY);
    if (this.speedX > 15) {
      this.speedX = 15;
    }
    if (this.speedX < -15) {
      this.speedX = -15;
    }
    if (this.speedY > 15) {
      this.speedY = 15;
    }
    if (this.speedY < -15) {
      this.speedY = -15;
    }
    if (!(this.speedX > 0.2 || this.speedX < -0.2)) {
      this.speedX = 0;
    }
    if (!(this.speedY > 0.2 || this.speedY < -0.2)) {
      this.speedY = 0;
    }
    this.y += this.speedY;
    this.x += this.speedX;
    this.coords = [this.x, this.y];
  }

  fall() {
    this.draw();
    // this.gravity();
    this.collisionWithEdges();
    this.slow();
    this.update();
  }
}

export default Ball;
