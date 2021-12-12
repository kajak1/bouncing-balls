import { GravitySensor } from "motion-sensors-polyfill";
import { Ball, UnknownBall } from "./types";
import { compose, manipulator } from "./utils";

export type Velocity = Pick<Ball["velocity"], "x" | "y">;

const additive = manipulator(function additing(num: number): number {
  return num > 0 ? num : -num;
});

const negative = manipulator(function negating(num: number): number {
  return num < 0 ? num : -num;
});

function adjustSpeed(mass: number) {
  return function adjustByMass(speed: number): number {
    return (5 * speed) / mass;
  };
}

class VelocityController {
  private sensor: GravitySensor;
  constructor(sensorReference: GravitySensor) {
    this.sensor = sensorReference;
  }

  calculateVelocity(balls: UnknownBall[]): Velocity[] {
    const { x: gravityX, y: gravityY } = this.sensor;
    const velocities: Velocity[] = [];

    balls.forEach((ball) => {
      const addAndAdjust = compose(adjustSpeed(ball.radius), additive);
      const negAndAdjust = compose(adjustSpeed(ball.radius), negative);

      velocities.push({
        x: gravityX < 0 ? addAndAdjust(gravityX) : negAndAdjust(gravityX),
        y: gravityY > 0 ? addAndAdjust(gravityY) : negAndAdjust(gravityY),
      });
    });

    return velocities;
  }
}

export { VelocityController };
