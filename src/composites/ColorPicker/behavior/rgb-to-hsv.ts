/* @layer renderer-components @kind logic */
import type { Hsv, Rgb } from './color-math.type';

const rgbToHsv = (rgb: Rgb): Hsv => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  const sector = (() => {
    if (delta === 0) return 0;
    if (max === r) return ((g - b) / delta) % 6;
    return max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  })();
  const h = Math.round(sector * 60);
  return { h: h < 0 ? h + 360 : h, s: max === 0 ? 0 : Math.round((delta / max) * 100), v: Math.round(max * 100) };
};

export { rgbToHsv };
