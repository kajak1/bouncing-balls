import { Vector } from "./types";

export function random(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function distance(a: Vector, b: Vector): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function substractVectors(a: Vector, b: Vector): Vector {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function dotProduct(a: Vector, b: Vector): number {
  return a.x * b.x + a.y * b.y;
}

export function multiplyVector(a: Vector, n: number): Vector {
  return { x: a.x * n, y: a.y * n };
}
