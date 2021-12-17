import { GravitySensor } from "motion-sensors-polyfill";
import { UnknownBall, Vector } from "./types";
import { substractVectors, dotProduct, multiplyVector } from "./math";

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

  public updateGravityVelocity(balls: UnknownBall[]): Vector[] {
    const { x: gravityX, y: gravityY } = this.sensor;
    const velocities: Vector[] = [];

    balls.forEach((ball) => {
      const adjust = adjustSpeed(ball.radius);

      velocities.push({
        x: -adjust(gravityX),
        y: adjust(gravityY),
      });
    });

    return velocities;
  }

  public calculateCollisionVelocity([b1, b2]: [
    b1: UnknownBall,
    b2: UnknownBall
  ]): [Vector, Vector] {
    const v1: Vector = b1.velocity;

    const second: number = (2 * b2.mass) / (b1.mass + b2.mass);

    const third: number =
      dotProduct(
        substractVectors(b1.velocity, b2.velocity),
        substractVectors(b1.position, b2.position)
      ) /
      dotProduct(
        substractVectors(b1.position, b2.position),
        substractVectors(b1.position, b2.position)
      );

    const fourth: Vector = substractVectors(b1.position, b2.position);
    const result1 = substractVectors(
      v1,
      multiplyVector(multiplyVector(fourth, third), second)
    );
    // -----------------------------------------------------------
    const v2: Vector = b2.velocity;

    const second2: number = (2 * b1.mass) / (b1.mass + b2.mass);

    const third2: number =
      dotProduct(
        substractVectors(b2.velocity, b1.velocity),
        substractVectors(b2.position, b1.position)
      ) /
      dotProduct(
        substractVectors(b2.position, b1.position),
        substractVectors(b2.position, b1.position)
      );

    const fourth2: Vector = substractVectors(b2.position, b1.position);

    const result2 = substractVectors(
      v2,
      multiplyVector(multiplyVector(fourth2, third2), second2)
    );

    return [result1, result2];
  }
}

export { VelocityController };
