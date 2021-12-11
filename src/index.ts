import { setupCanvasSize } from "./utils";
import { BallMaker } from "./BallMaker";

type AnimationCallback = (timestamp: DOMHighResTimeStamp) => void;

function animate(canvas: HTMLCanvasElement): AnimationCallback {
  const maker = new BallMaker();
  maker.create(25, "small", "fast", "moveable");
  maker.create(25, "big", "slow", "moveable");

  // eslint-disable-next-line
  return function animation(timestamp: DOMHighResTimeStamp): void {
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      maker.draw(ctx);
      window.requestAnimationFrame(animation);
    }
  };
}

const canvas = document.querySelector("canvas");

if (canvas) {
  setupCanvasSize(canvas); // TODO subscribe to window size change

  window.requestAnimationFrame(animate(canvas));
}
