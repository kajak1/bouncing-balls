import { ctx, canvas, image } from './constants.js';

class Test {
  constructor() {
    this.x = 50;
    this.y = 50;
  }

  draw(degrees) {
    // ctx.drawImage(image, 50, 50);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    // move to the center of the canvas
    ctx.translate(this.x, this.y);
    // ctx.translate(canvas.width / 2, canvas.height / 2);

    // rotate the canvas to the specified degrees
    console.log(degrees);
    ctx.rotate((degrees * Math.PI) / 180);

    // draw the image
    // since the ctx is rotated, the image will be rotated also
    ctx.drawImage(image, -image.width / 2, -image.width / 2);

    // we’re done with the rotating so restore the unrotated ctx
    ctx.restore();
  }

  move(degrees) {
    this.draw(degrees);
    // this.x += 1;
    this.y += 1;
    console.log(this.x, this.y);
  }
}

export default Test;
