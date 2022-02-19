import { initSensor, setupCanvasSize } from "./utils";
import { BallController } from "./BallController";
import { GravityController } from "./GravityController";
import {
  calcNewVelocities,
  checkBallCollisions,
  checkWallCollisions,
  resolveBallCollision,
  resolveWallCollision,
} from "./collision";

type AnimationCallback = (timestamp: DOMHighResTimeStamp) => void;

const APP_MODE: "sensor" | "bounce" | "improvement" = "improvement";

function initApp(canvas: HTMLCanvasElement): AnimationCallback {
  const Maker = new BallController();

  Maker.create(25, "small", "light", "moveable", "colorful");
  Maker.create(25, "big", "heavy", "moveable", "colorful");

  const sensor = initSensor();
  const GravityCtrl = new GravityController(sensor);

  // eslint-disable-next-line
  return function animation(timestamp: DOMHighResTimeStamp): void {
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Maker.update();
      Maker.draw(ctx);

      const balls = Maker.getBalls;
      if (APP_MODE === "improvement") {
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
          const [p1, p2] = resolveBallCollision([b1, b2]);
          const [v1, v2] = calcNewVelocities([b1, b2]);

          balls[b1.id].position = p1;
          balls[b1.id].velocity = v1;
          balls[b2.id].position = p2;
          balls[b2.id].velocity = v2;
        });

        Maker.setNew(balls);
      }

      if (APP_MODE === "sensor") {
        // Maker.updateAll(GravityCtrl.updateVelocity(balls));
        Maker.updateAllSize(GravityCtrl.scaleZ(balls));
      }

      if (APP_MODE === "bounce") {
        const colliions = checkBallCollisions(balls);
        colliions.forEach((pair) => {
          const [b1, b2] = pair;
          const [pos1, pos2] = resolveBallCollision(pair);

          Maker.updateBallPosition(b1.id, pos1);
          Maker.updateBallPosition(b2.id, pos2);

          const [vel1, vel2] = calcNewVelocities(pair);
          Maker.updateBallVelocity(b1.id, vel1);
          Maker.updateBallVelocity(b2.id, vel2);
        });
      }
    }

    window.requestAnimationFrame(animation);
  };
}

const canvas = document.querySelector("canvas");

if (canvas) {
  setupCanvasSize(canvas); // TODO subscribe to window size change

  window.requestAnimationFrame(initApp(canvas));
}
