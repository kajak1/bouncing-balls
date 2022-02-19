import { GravitySensor } from "motion-sensors-polyfill";
import { random } from "./math";
import { Colors } from "./types";

export function adjustSpeedByMass(radius: number) {
  return function adjust(speed: number): number {
    return (5 * speed) / radius;
  };
}

export function getRandomColor(): keyof typeof Colors {
  const colorsArr = Object.keys(Colors) as (keyof typeof Colors)[];
  const randIndex = random(0, colorsArr.length);

  return colorsArr[randIndex];
}

export function setupCanvasSize(canvas: HTMLCanvasElement): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function initSensor(): GravitySensor {
  if ("GravitySensor" in window) {
    const sensor = new GravitySensor({ frequency: 60 });
    sensor.start();
    console.log("sensor running");

    return sensor;
  } else {
    throw "No sensor object in window";
  }
}

export function isArray(target: unknown): target is unknown[] {
  return Array.isArray(target);
}

// TODO type this
export function clone_recursive(target, map = new Map()) {
  if (typeof target === "object") {
    const cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone_recursive(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
