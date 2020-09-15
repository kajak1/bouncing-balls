import Ball from './Ball.js';
import { distBetweenAB } from './constants.js';

class Generator {
  constructor() {
    this.balls = [];
    this.reservedCoords = {};
    for (let i = 0; i <= 2; i++) {
      this.balls[i] = new Ball();
      console.log(this.balls[i]);

      if (i != 0) {
        let fine = true;
        const A = this.balls[i].coords[0];
        for (const prop in this.reservedCoords) {
          const B = this.reservedCoords[prop];
          if (distBetweenAB(A, B) <= 50) {
            fine = false;
            console.log(`do usuniecia ${this.balls[i].coords}`);
            this.balls[i] = {};
            this.reservedCoords[prop] = [];
            break;
          }
        }
        if (fine) {
          console.log('dodalem coordy');
          this.reservedCoords[i] = this.balls[i].coords;
        }
      } else {
        this.reservedCoords[i] = this.balls[i].coords;
        console.log('dodalem coordy');
      }
      console.log(this.reservedCoords);
    }
    // console.log(this.reservedCoords);
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
      ball.fall();
      // console.log(ball);
    });
    // console.log(this.balls[0], this.balls);
    // console.log(this.balls[0]);
  }
}

export default Generator;
