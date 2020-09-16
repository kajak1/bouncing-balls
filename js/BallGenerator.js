import Ball from './Ball.js';
import { distBetweenAB } from './constants.js';

class Generator {
  constructor() {
    this.balls = [];
    this.reservedCoords = {};
    for (let i = 0; i <= 1; i++) {
      this.balls[i] = new Ball();
      // make sure no ball was created colliding with any other
      if (i != 0) {
        let fine = true;
        const A = this.balls[i].coords;
        for (const prop in this.reservedCoords) {
          const B = this.reservedCoords[prop];
          if (distBetweenAB(A, B) <= 50) {
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
  }

  compare(ball1, ball2) {
    if (ball1.x < ball2.x) {
      return -1;
    }
    if (ball1.x > ball2.x) {
      return 1;
    }
    return 0;
  }

  findClosestBalls() {
    const sorted = this.balls.sort(this.compare);
    // for (let i = 0; i <= sorted.length - 2; i += 2) {
    if (distBetweenAB(sorted[0].coords, sorted[1].coords) <= 50) {
      if (sorted[0].collision === false && sorted[1].collision === false) {
        sorted[0].speedX *= -1;
        sorted[1].speedX *= -1;
        sorted[0].collision = true;
        sorted[1].collision = true;
      }
    } else {
      sorted[0].collision = false;
      sorted[1].collision = false;
    }
    // }
  }

  draw() {
    this.findClosestBalls();
    this.balls.forEach((ball) => {
      if (ball) {
        ball.fall();
      }
    });
  }
}

export default Generator;
