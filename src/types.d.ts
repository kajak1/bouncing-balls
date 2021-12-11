export type MoveableBall = Ball & Moveable;
export type UnknownBall = MoveableBall | Ball;

export interface Moveable {
  move: () => void;
}

export interface Ball {
  position: {
    x: number;
    y: number;
  };

  velocity: {
    x: number;
    y: number;
  };

  radius: number;

  draw: (ctx: CanvasRenderingContext2D) => void;
}
