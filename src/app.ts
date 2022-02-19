import { initSensor } from "./utils";
import { BallController } from "./BallController";
import { GravityController } from "./GravityController";
import {
  resolveBallsPosition,
  resolveBallsVelocity,
  checkBallCollisions,
  checkWallCollisions,
  resolveWallCollision,
} from "./collision";

import { APP_MODE } from "./types";

type AnimationCallback = (timestamp: DOMHighResTimeStamp) => void;

function initApp(canvas: HTMLCanvasElement, MODE: APP_MODE): AnimationCallback {
  const BallCtrl = new BallController();

  BallCtrl.create(15, "small", "light", "moveable", "colorful");
  BallCtrl.create(15, "big", "heavy", "moveable", "colorful");

  const sensor = initSensor();
  const GravityCtrl = new GravityController(sensor);

  // eslint-disable-next-line
  return function animation(timestamp: DOMHighResTimeStamp): void {
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      BallCtrl.move();
      BallCtrl.draw(ctx);

      const balls = BallCtrl.getBalls;
      if (MODE === "improvement") {
        const sensorVels = GravityCtrl.getVelocityFromSensor(balls);
        balls.forEach((ball, index) => {
          ball.velocity.x += sensorVels[index].x;
          ball.velocity.y += sensorVels[index].y;
        });

        const wallCollisions = checkWallCollisions(balls, ctx);
        wallCollisions.forEach(([ball, wall]) => {
          const resolver = resolveWallCollision(ctx);
          const { position, velocity } = resolver([ball, wall]);

          balls[ball.id].position = position;
          balls[ball.id].velocity = velocity;
        });

        const ballCollisions = checkBallCollisions(balls);
        ballCollisions.forEach(([b1, b2]) => {
          const [p1, p2] = resolveBallsPosition([b1, b2]);
          const [v1, v2] = resolveBallsVelocity([b1, b2]);

          balls[b1.id].position = p1;
          balls[b1.id].velocity = v1;
          balls[b2.id].position = p2;
          balls[b2.id].velocity = v2;
        });

        BallCtrl.setNew(balls);
      }
    }

    window.requestAnimationFrame(animation);
  };
}

export { initApp };
