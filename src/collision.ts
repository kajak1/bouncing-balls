import { UnknownBall, Vector } from "./types";
import { dotProduct, substractVectors, multiplyVector, distance } from "./math";

type BallPair = [UnknownBall, UnknownBall];

export function checkBallCollisions(balls: UnknownBall[]): BallPair[] {
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

type Wall = "right" | "left" | "top" | "bottom";

export function checkWallCollisions(
  balls: UnknownBall[],
  ctx: CanvasRenderingContext2D
): [UnknownBall, Wall][] {
  const colliding: [UnknownBall, Wall][] = [];

  balls.forEach((ball) => {
    if (ball.position.x + ball.radius > ctx.canvas.width) {
      colliding.push([ball, "right"]);
    }

    if (ball.position.x - ball.radius < 0) {
      colliding.push([ball, "left"]);
    }

    if (ball.position.y + ball.radius > ctx.canvas.height) {
      colliding.push([ball, "bottom"]);
    }

    if (ball.position.y - ball.radius < 0) {
      colliding.push([ball, "top"]);
    }
  });

  return colliding;
}

export function resolveWallCollision(ctx: CanvasRenderingContext2D) {
  return function resolveCollision(
    colliding: [UnknownBall, Wall]
  ): { position: Vector; velocity: Vector } {
    const [ball, wall] = colliding;

    if (wall === "right") {
      return {
        position: { ...ball.position, x: ctx.canvas.width - ball.radius },
        velocity: { ...ball.velocity, x: ball.velocity.x * -0.5 },
      };
    }

    if (wall === "left") {
      return {
        position: { ...ball.position, x: ball.radius },
        velocity: { ...ball.velocity, x: ball.velocity.x * -0.5 },
      };
    }

    if (wall === "top") {
      return {
        position: { ...ball.position, y: ball.radius },
        velocity: { ...ball.velocity, y: ball.velocity.y * -0.5 },
      };
    }

    if (wall === "bottom") {
      return {
        position: { ...ball.position, y: ctx.canvas.height - ball.radius },
        velocity: { ...ball.velocity, y: ball.velocity.y * -0.5 },
      };
    }

    throw new Error("wrong wall value");
  };
}

export function resolveBallsPosition(pair: BallPair): [Vector, Vector] {
  const [b1, b2] = pair;
  const dist = distance(b1.position, b2.position);
  const overlap = (dist - b1.radius - b2.radius) / 2;

  const spaceX = (overlap * (b1.position.x - b2.position.x)) / dist;
  const spaceY = (overlap * (b1.position.y - b2.position.y)) / dist;

  const b1x = b1.position.x - spaceX;

  const b1y = b1.position.y - spaceY;

  const b2x = b2.position.x + spaceX;

  const b2y = b2.position.y + spaceY;

  return [
    { x: b1x, y: b1y },
    { x: b2x, y: b2y },
  ];
}

export function resolveBallsVelocity(pair: BallPair): [Vector, Vector] {
  const [b1, b2] = pair;
  const v1 = b1.velocity;

  const second = (2 * b2.mass) / (b1.mass + b2.mass);

  const third =
    dotProduct(
      substractVectors(b1.velocity, b2.velocity),
      substractVectors(b1.position, b2.position)
    ) /
    dotProduct(
      substractVectors(b1.position, b2.position),
      substractVectors(b1.position, b2.position)
    );

  const fourth = substractVectors(b1.position, b2.position);
  const result1 = substractVectors(
    v1,
    multiplyVector(multiplyVector(fourth, third), second)
  );
  // -----------------------------------------------------------
  const v2 = b2.velocity;

  const second2 = (2 * b1.mass) / (b1.mass + b2.mass);

  const third2 =
    dotProduct(
      substractVectors(b2.velocity, b1.velocity),
      substractVectors(b2.position, b1.position)
    ) /
    dotProduct(
      substractVectors(b2.position, b1.position),
      substractVectors(b2.position, b1.position)
    );

  const fourth2 = substractVectors(b2.position, b1.position);

  const result2 = substractVectors(
    v2,
    multiplyVector(multiplyVector(fourth2, third2), second2)
  );

  return [result1, result2];
}
