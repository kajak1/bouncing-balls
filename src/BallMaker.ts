import { Ball, MoveableBall, UnknownBall } from "./types";
import { Props, defaultBall, small, big, fast, slow, moveable } from "./Ball";
import { Velocity } from "./VelocityController";

class BallMaker {
  private balls: UnknownBall[] = [];
  constructor() {
    // do nothing
  }

  private createOne(...props: (keyof typeof Props)[]): UnknownBall {
    const target = Object.assign({}, defaultBall());
    props.map((prop) =>
      ({
        small: (): Ball => Object.assign(target, small()),
        big: (): Ball => Object.assign(target, big()),
        slow: (): Ball => Object.assign(target, slow()),
        fast: (): Ball => Object.assign(target, fast()),
        moveable: (): MoveableBall => Object.assign(target, moveable(target)),
      }[prop]())
    );

    return target;
  }

  public create(amount: number, ...props: (keyof typeof Props)[]): void {
    for (let i = 0; i < amount; i++) {
      this.balls.push(this.createOne(...props));
    }
  }

  public update(velocities: Velocity[]): void {
    velocities.forEach((newVelocity, index) => {
      this.balls[index].velocity = newVelocity;
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

export { BallMaker };
