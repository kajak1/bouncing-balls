import { Ball, UnknownBall, Vector } from "./types";
import { Props, defaultBall, small, big, moveable, light, heavy } from "./Ball";
import { distance } from "./math";

class BallController {
  private balls: UnknownBall[] = [];
  private takenCoords: Pick<Ball, "id">[] = [];

  constructor() {
    // do nothing
  }

  private assignProps(target: Ball): (prop: keyof typeof Props) => UnknownBall {
    return function assign(prop: keyof typeof Props): UnknownBall {
      switch (prop) {
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

  private checkPosition(ball: UnknownBall): boolean {
    if (!this.takenCoords) return true;

    this.takenCoords.forEach((coord) => {
      const otherBall = this.balls[coord.id];
      if (
        distance(ball.position, otherBall.position) <
        ball.radius + otherBall.radius
      ) {
        return false;
      }
    });
    return true;
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

  public updateAll(velocities: Vector[]): void {
    velocities.forEach((newData, index) => {
      this.balls[index].velocity = newData;
    });
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.balls.forEach((ball) => {
      ball.draw(ctx);

      if ("move" in ball) {
        ball.move();
      }
    });
  }

  get getBalls(): UnknownBall[] {
    return [...this.balls];
  }
}

export { BallController };
