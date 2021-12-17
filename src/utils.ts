import { GravitySensor } from "motion-sensors-polyfill";

function setupCanvasSize(canvas: HTMLCanvasElement): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initSensor(): GravitySensor {
  if ("GravitySensor" in window) {
    const sensor = new GravitySensor({ frequency: 60 });
    sensor.start();
    console.log("sensor running");

    return sensor;
  } else {
    throw "No sensor object in window";
  }
}

export { setupCanvasSize, initSensor };
