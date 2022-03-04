import { GravitySensor } from "motion-sensors-polyfill";
import { random } from "./math";
import { Colors } from "./types";

export function adjustSpeedByMass(radius: number) {
  return function adjust(speed: number): number {
    return (5 * speed) / radius;
  };
}

export function getRandomColor(): typeof Colors[number] {
  const randIndex = random(0, Colors.length);
  const colorsObj = { ...Colors };

  return colorsObj[randIndex];
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

export function clone_recursive<T>(target: T, map = new Map()): T {
  if (typeof target === "object") {
    const cloneTarget: Record<string, unknown> | unknown[] = Array.isArray(
      target
    )
      ? []
      : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    if (!Array.isArray(cloneTarget)) {
      for (const key in target) {
        cloneTarget[key] = clone_recursive(target[key], map);
      }
    } else {
      if (Array.isArray(target)) {
        target.forEach((_, index) => {
          cloneTarget[index] = clone_recursive(target[index], map);
        });
      }
    }
    return cloneTarget as T;
  } else {
    return target;
  }
}
