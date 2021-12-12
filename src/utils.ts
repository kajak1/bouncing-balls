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

    return sensor;
  } else {
    throw "No sensor object in window";
  }
}

function manipulator(fn: any) {
  // TODO type this
  return function manipulateFn(arg: any): any {
    return fn(arg);
  };
}

function compose(...fns: any) {
  return function composed(result: any): any {
    // copy the array of functions
    const list = [...fns];

    while (list.length > 0) {
      // take the last function off the end of the list
      // and execute it
      result = list.pop()(result);
    }

    return result;
  };

  // from https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch4.md/#general-composition
}

export { setupCanvasSize, random, initSensor, manipulator, compose };
