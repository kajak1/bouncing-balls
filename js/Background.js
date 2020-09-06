import { canvas, ctx } from './constants.js';

class Background {
  constructor() {}

  draw() {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, '#020024');
    gradient.addColorStop(0.36, '#090979');
    gradient.addColorStop(1, '#00d4ff');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

export default Background;
