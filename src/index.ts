import { initSensor, setupCanvasSize } from "./utils";
import { BallController } from "./BallController";
import { VelocityController } from "./VelocityController";
import {
  calcNewVelocities,
  checkCollisions,
  resolveCollision,
} from "./collision";

type AnimationCallback = (timestamp: DOMHighResTimeStamp) => void;

function initApp(canvas: HTMLCanvasElement): AnimationCallback {
  const Maker = new BallController();

  Maker.create(50, "small", "light", "moveable");
  Maker.create(50, "big", "heavy", "moveable");

  const sensor = initSensor();
  const VelocityCtrl = new VelocityController(sensor);

  // eslint-disable-next-line
  return function animation(timestamp: DOMHighResTimeStamp): void {
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Maker.draw(ctx);

      const balls = Maker.getBalls;

      Maker.updateAll(VelocityCtrl.updateGravityVelocity(balls));

      // const pairs = checkCollisions(balls);
      // const Velocities = pairs.map(calcNewVelocities);
      // const Positions = pairs.map(resolveCollision);

      // pairs.forEach((pair, index) => {
      //   const [b1, b2] = pair;

      //   Maker.updateBallVelocity(b1.id, Velocities[index][0]);
      //   Maker.updateBallVelocity(b2.id, Velocities[index][1]);

      //   Maker.updateBallPosition(b1.id, Positions[index][0]);
      //   Maker.updateBallPosition(b2.id, Positions[index][1]);
      // });
    }

    window.requestAnimationFrame(animation);
  };
}

const canvas = document.querySelector("canvas");

if (canvas) {
  setupCanvasSize(canvas); // TODO subscribe to window size change

  window.requestAnimationFrame(initApp(canvas));
}
