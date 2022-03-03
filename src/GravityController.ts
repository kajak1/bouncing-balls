import { GravitySensor } from "motion-sensors-polyfill";
import { UnknownBall, Vector } from "./types";
import { adjustSpeedByMass } from "./utils";

class GravityController {
  private sensor: GravitySensor;
  constructor(sensorReference: GravitySensor) {
    this.sensor = sensorReference;
  }

  public getVelocityFromSensor(balls: UnknownBall[]): Vector[] {
    const { x: gravityX, y: gravityY } = this.sensor;
    const velocities: Vector[] = [];

    balls.forEach((ball) => {
      const adjust = adjustSpeedByMass(ball.mass);

      velocities.push({
        x: -adjust(gravityX) / 9.8,
        y: adjust(gravityY) / 9.8,
      });
    });

    return velocities;
  }
}

export { GravityController };
