import { DefaultBall, UnknownBall, Vector } from "./types";
import {
  Props,
  defaultBall,
  small,
  big,
  moveable,
  light,
  heavy,
  colorful,
} from "./Ball";
import { clone_recursive } from "./utils";

class BallController {
  private balls: UnknownBall[] = [];
  private takenCoords: Pick<DefaultBall, "id">[] = [];

  constructor() {
    // do nothing
  }

  private assignProps(
    target: DefaultBall
  ): (prop: keyof typeof Props) => UnknownBall {
    return function assign(prop: keyof typeof Props): UnknownBall {
      switch (prop) {
        case "colorful":
          Object.assign(target, colorful());
          break;
        case "small":
          Object.assign(target, small());
          break;
        case "big":
          Object.assign(target, big());
          break;
        case "light":
          Object.assign(target, light());
          break;
        case "heavy":
          Object.assign(target, heavy());
          break;
        case "moveable":
          Object.assign(target, moveable(target));
          break;
      }

      return target;
    };
  }

  private createOne(id: number, ...props: (keyof typeof Props)[]): UnknownBall {
    const target = Object.assign({}, defaultBall(id));
    props.forEach(this.assignProps(target));
    return target;
  }

  public create(amount: number, ...props: (keyof typeof Props)[]): void {
    const ballCount = this.balls.length;
    for (let i = 0; i < amount; i++) {
      this.balls.push(this.createOne(ballCount + i, ...props));
    }
  }

  public updateBallVelocity(i: number, newData: Vector): void {
    this.balls[i].velocity = newData;
  }

  public updateBallPosition(i: number, newData: Vector): void {
    this.balls[i].position = newData;
  }

  public getBall(i: number): UnknownBall {
    return { ...this.balls[i] };
  }

  public setNew(balls: UnknownBall[]): void {
    this.balls.forEach((ball) => {
      this.balls[ball.id].velocity = balls[ball.id].velocity;
      this.balls[ball.id].position = balls[ball.id].position;
    });
  }

  public updateAll(velocities: Vector[]): void {
    velocities.forEach((newData, index) => {
      this.balls[index].velocity = newData;
    });
  }

  public updateAllSize(radiuses: number[]): void {
    radiuses.forEach((radius, index) => {
      this.balls[index].radius = radius;
    });
  }

  public move(): void {
    this.balls.forEach((ball) => {
      if ("move" in ball) {
        ball.move();
      }
    });
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.balls.forEach((ball) => {
      ball.draw(ctx);
    });
  }

  get getBalls(): UnknownBall[] {
    return clone_recursive(this.balls);
  }
}

export { BallController };
