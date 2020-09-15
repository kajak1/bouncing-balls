import Ball from './Ball.js';
import { distBetweenAB } from './constants.js';

class Generator {
  constructor() {
    this.balls = [];
    this.reservedCoords = {};
    for (let i = 0; i <= 2; i++) {
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
    console.log(sorted);
    this.balls.forEach((ball) => {
      // console.log(ball);
      const closest = () => {
        sorted.forEach((el) => {
          if (el == ball) {
            return;
          }
          // console.log(el);
          if (el.x < ball.x) {
            if (ball.x - el.x < ball.closest.x) {
              ball.closest = el;
            }
          } else {
            if (el.x - ball.x < ball.closest.x) {
              ball.closest = el;
            }
          }
        });
      };
      closest();
    });
  }

  draw() {
    // this.findClosestBalls();
    console.log(this.balls);
    this.balls.forEach((ball) => {
      if (ball) {
        console.log('jest');
        ball.fall();
      }
      // console.log(ball);
    });
    // console.log(this.balls[0], this.balls);
    // console.log(this.balls[0]);
  }
}

export default Generator;
