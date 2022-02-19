import { random } from "./math";
import { Moveable, DefaultBall } from "./types";
import { getRandomColor } from "./utils";

export const moveable = (state: DefaultBall): Moveable => ({
  move: (): void => {
    state.position.x += state.velocity.x;
    state.position.y += state.velocity.y;
  },
});

export const colorful = (): Pick<DefaultBall, "color"> => ({
  color: getRandomColor(),
});

export const small = (): Pick<DefaultBall, "radius"> => ({
  radius: random(5, 10),
});

export const big = (): Pick<DefaultBall, "radius"> => ({
  radius: random(10, 20),
});

export const light = (): Pick<DefaultBall, "mass"> => ({
  mass: random(5, 10),
});

export const heavy = (): Pick<DefaultBall, "mass"> => ({
  mass: random(20, 30),
});

export const Props = {
  colorful,
  small,
  big,
  light,
  heavy,
  moveable,
} as const;

export const defaultBall = (id: number): DefaultBall => ({
  id: id,

  color: "black",

  position: {
    x: random(1, window.innerWidth),
    y: random(1, window.innerHeight),
  },

  velocity: {
    x: 0,
    y: 0,
  },

  radius: 0,
  mass: 0,

  draw: function (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  },
});
