/* @layer renderer-components @kind types */
interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Hsv {
  h: number;
  s: number;
  v: number;
}

interface Oklch {
  l: number;
  c: number;
  h: number;
}

export type { Hsv, Oklch, Rgb };
