import { Vector } from "./math";

export type MoveableBall = Ball & Moveable;
export type UnknownBall = MoveableBall | Ball;

export interface Moveable {
  move: () => void;
}

export interface Vector {
  x: number;
  y: number;
}

export interface Ball {
  id: number;

  position: Vector;

  velocity: Vector;

  radius: number;
  mass: number;

  draw: (ctx: CanvasRenderingContext2D) => void;
}
