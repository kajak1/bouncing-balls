import { random } from "./math";
import { Moveable, Ball } from "./types";

export const moveable = (state: Ball): Moveable => ({
  move: (): void => {
    state.position.x += state.velocity.x;
    state.position.y += state.velocity.y;
  },
});

export const small = (): Pick<Ball, "radius"> => ({
  radius: random(1, 10),
});

export const big = (): Pick<Ball, "radius"> => ({
  radius: random(10, 20),
});

export const light = (): Pick<Ball, "mass"> => ({
  mass: random(1, 10),
});

export const heavy = (): Pick<Ball, "mass"> => ({
  mass: random(30, 40),
});

export const Props = {
  small,
  big,
  light,
  heavy,
  moveable,
} as const;

export const defaultBall = (id: number): Ball => ({
  id: id,

  position: {
    x: random(1, window.innerWidth),
    y: random(1, window.innerHeight),
  },

  velocity: {
    x: random(-5, 5),
    y: random(-5, 5),
  },

  radius: 0,
  mass: 0,

  draw: function (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  },
});
