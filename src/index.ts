import { setupCanvasSize } from "./utils";

import { initApp } from "./app";

const canvas = document.querySelector("canvas");

if (canvas) {
  setupCanvasSize(canvas); // TODO subscribe to window size change

  window.requestAnimationFrame(initApp(canvas, "improvement"));
}
