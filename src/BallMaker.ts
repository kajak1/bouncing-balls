import { Ball, MoveableBall, UnknownBall } from "./types";
import { Props, defaultBall, small, big, fast, slow, moveable } from "./Ball";

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

  create(amount: number, ...props: (keyof typeof Props)[]): void {
    for (let i = 1; i < amount; i++) {
      this.balls.push(this.createOne(...props));
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.balls.forEach((ball) => {
      ball.draw(ctx);

      if ("move" in ball) {
        ball.move();
      }
    });
  }
}

export { BallMaker };
