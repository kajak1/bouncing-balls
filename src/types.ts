export type APP_MODE = "sensor" | "bounce" | "improvement";
export type UnknownBall = (DefaultBall & Moveable) | DefaultBall;

export interface Moveable {
  move: () => void;
}

export interface Vector {
  x: number;
  y: number;
}

export interface DefaultBall {
  id: number;

  color: string;

  position: Vector;

  velocity: Vector;

  radius: number;
  mass: number;

  draw: (ctx: CanvasRenderingContext2D) => void;
}

export const Colors = [
  "#FF6347",
  "#977390",
  "#AC7B7D",
  "#BB8A89",
  "#502F4C",
  "#70587C",
  "#C8B8DB",
] as const;
