import { random } from "./utils";
import { Moveable, Ball } from "./types";

export const moveable = (state: Ball): Moveable => ({
  move: (): void => {
    state.position.x += state.velocity.x;
    state.position.y += state.velocity.y;
  },
});

export const slow = (): Pick<Ball, "velocity"> => ({
  velocity: {
    x: random(1, 3),
    y: random(1, 3),
  },
});

export const fast = (): Pick<Ball, "velocity"> => ({
  velocity: {
    x: random(3, 5),
    y: random(3, 5),
  },
});

export const small = (): Pick<Ball, "radius"> => ({
  radius: random(1, 5),
});

export const big = (): Pick<Ball, "radius"> => ({
  radius: random(5, 10),
});

export const Props = {
  small,
  big,
  slow,
  fast,
  moveable,
} as const;

export const defaultBall = (): Ball => ({
  position: {
    x: random(1, window.innerWidth),
    y: random(1, window.innerHeight),
  },

  velocity: {
    x: 0,
    y: 0,
  },

  radius: 0,

  draw: function (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  },
});
