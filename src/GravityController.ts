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

  public scaleZ(balls: UnknownBall[]): number[] {
    const { z: gravityZ } = this.sensor;

    const maxRatio = 1.0001;
    const minRatio = 0.9999;

    const radiuses = balls.map((ball) => {
      let newRadius =
        ball.radius * (-gravityZ * (maxRatio - minRatio) + minRatio);

      const minRadius = ball.radius * 0.9;
      const maxRadius = ball.radius * 1.1;
      if (newRadius < minRadius) {
        newRadius = minRadius;
      } else if (newRadius > maxRadius) {
        newRadius = maxRadius;
      }

      return newRadius;
    });

    return radiuses;
  }
}

export { GravityController };
