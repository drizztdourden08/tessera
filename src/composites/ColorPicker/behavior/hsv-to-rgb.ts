/* @layer renderer-components @kind logic */
import type { Hsv, Rgb } from './color-math.type';

const hsvToRgb = (hsv: Hsv): Rgb => {
  const s = hsv.s / 100;
  const v = hsv.v / 100;
  const channel = (n: number): number => {
    const k = (n + hsv.h / 60) % 6;
    return Math.round((v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255);
  };
  return { r: channel(5), g: channel(3), b: channel(1) };
};

export { hsvToRgb };
