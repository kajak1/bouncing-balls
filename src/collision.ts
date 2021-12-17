import { UnknownBall, Vector } from "./types";
import { dotProduct, substractVectors, multiplyVector, distance } from "./math";

type BallPair = [UnknownBall, UnknownBall];

export function checkCollisions(balls: UnknownBall[]): BallPair[] {
  const colliding: BallPair[] = [];

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (
        distance(balls[i].position, balls[j].position) <
        balls[i].radius + balls[j].radius
      ) {
        colliding.push([balls[i], balls[j]]);
      }
    }
  }
  return colliding;
}

export function resolveCollision(pair: BallPair): [Vector, Vector] {
  const [b1, b2] = pair;
  const dist = distance(b1.position, b2.position);
  const overlap = (dist - b1.radius - b2.radius) / 2;

  const b1x =
    b1.position.x + (overlap * (b1.position.x - b2.position.x)) / dist;

  const b1y =
    b1.position.y - (overlap * (b1.position.y - b2.position.y)) / dist;

  const b2x =
    b2.position.x + (overlap * (b1.position.x - b2.position.x)) / dist;

  const b2y =
    b2.position.y + (overlap * (b1.position.y - b2.position.y)) / dist;

  return [
    { x: b1x, y: b1y },
    { x: b2x, y: b2y },
  ];
}

export function calcNewVelocities(pair: BallPair): [Vector, Vector] {
  const [b1, b2] = pair;
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
