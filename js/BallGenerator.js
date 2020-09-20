import Ball from './Ball.js';
import { distBetweenAB, ballRadius } from './constants.js';

class Generator {
  constructor(ballsAmount) {
    this.balls = [];
    this.reservedCoords = {};
    this.collidingPairs = [];
    for (let i = 0; i <= ballsAmount - 1; i++) {
      this.balls[i] = new Ball(i);
      // make sure no ball was created colliding with any other
      if (i != 0) {
        let fine = true;
        const A = this.balls[i].coords;
        for (const prop in this.reservedCoords) {
          const B = this.reservedCoords[prop];
          if (distBetweenAB(A, B) <= 2 * ballRadius) {
            fine = false;
            this.balls[i] = false;
            this.reservedCoords[i] = [];
            i -= 1;
            break;
          }
        }
        if (fine) {
          this.reservedCoords[i] = this.balls[i].coords;
        }
      } else {
        this.reservedCoords[i] = this.balls[i].coords;
      }
    }
    // console.log(this.balls);
  }

  checkCollision() {
    for (let i = 0; i <= this.balls.length - 1; i++) {
      for (let j = i + 1; j <= this.balls.length - 1; j++) {
        if (this.balls[i].checkCollisionWithBall(this.balls[j])) {
          this.collidingPairs.push({
            ball1: this.balls[i],
            ball2: this.balls[j],
            distance: distBetweenAB(this.balls[i].coords, this.balls[j].coords),
          });
          this.balls[i].handleCollision(this.balls[j]);
        }
      }
    }
    // console.log(this.collidingPairs);
    this.collidingPairs.forEach((pair) => {
      console.log(pair);

      // normal
      const nx = (pair.ball2.x - pair.ball1.x) / pair.distance;
      const ny = (pair.ball2.y - pair.ball1.y) / pair.distance;

      // tangent
      const tx = -ny;
      const ty = nx;

      const dpTan1 = pair.ball1.speedX * tx + pair.ball1.speedY * ty;
      const dpTan2 = pair.ball1.speedX * tx + pair.ball1.speedY * ty;

      const dpNorm1 = pair.ball1.speedX * nx + pair.ball1.speedY * ny;
      const dpNorm2 = pair.ball2.speedX * nx + pair.ball2.speedY * ny;

      const m1 = dpNorm2;
      const m2 = dpNorm1;

      pair.ball1.speedX = tx * dpTan1 + nx * m1;
      pair.ball1.speedY = ty * dpTan1 + ny * m1;
      pair.ball2.speedX = tx * dpTan2 + nx * m2;
      pair.ball2.speedY = ty * dpTan2 + ny * m2;
    });

    this.collidingPairs = [];
  }

  draw() {
    this.checkCollision();
    this.balls.forEach((ball) => {
      ball.fall();
    });
  }
}

export default Generator;
