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

export const Colors = {
  tomato: "FF6347",
  moutbattenPink: "977390",
  oldRose: "AC7B7D",
  rosyBrown: "BB8A89",
  darkByznatium: "502F4C",
  chineseViolet: "70587C",
  thistle: "C8B8DB",
} as const;
