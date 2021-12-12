import { GravitySensor } from "motion-sensors-polyfill";
import { Ball, UnknownBall } from "./types";

export type Velocity = Pick<Ball["velocity"], "x" | "y">;

class VelocityController {
  private sensor: GravitySensor;
  constructor(sensorReference: GravitySensor) {
    this.sensor = sensorReference;
  }

  calculateVelocity(balls: UnknownBall[]): Velocity[] {
    const { y } = this.sensor;
    console.log(y);
    const velocities: Velocity[] = [];

    if (y > 9 && y < 10) {
      balls.map((ball) => {
        const { velocity: ballVelocity } = ball;
        velocities.push({ x: 0, y: ballVelocity.y });
      });

      return velocities;
    }

    if (y < -9 && y > -10) {
      balls.map((ball) => {
        const { velocity: ballVelocity } = ball;
        velocities.push({ x: 0, y: -ballVelocity.y });
      });

      return velocities;
    }

    return velocities;
  }
}

export { VelocityController };
