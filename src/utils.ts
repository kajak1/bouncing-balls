import { GravitySensor } from "motion-sensors-polyfill";

function setupCanvasSize(canvas: HTMLCanvasElement): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function random(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initSensor(): GravitySensor {
  if ("GravitySensor" in window) {
    const sensor = new GravitySensor({ frequency: 60 });

    sensor.start();

    console.log("sensor running");
    console.log(sensor);
    return sensor;
  } else {
    throw "No sensor object in window";
  }
}

export { setupCanvasSize, random, initSensor };
