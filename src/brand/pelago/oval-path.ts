/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';

const round = (n: number): number => Number(n.toFixed(3));

const ovalPath = ([cx, cy]: ScenePoint, rx: number, ry: number = rx): string =>
  `M${round(cx - rx)} ${round(cy)}a${round(rx)} ${round(ry)} 0 1 0 ${round(rx * 2)} 0a${round(rx)} ${round(ry)} 0 1 0 ${round(-rx * 2)} 0z`;

export { ovalPath };
