/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';
import { ovalPath } from './oval-path';

const DOTS = 14;

const dot = (i: number): readonly [x: number, y: number, r: number] => {
  const turn = (i / DOTS) * Math.PI * 2;
  return [15 + Math.cos(turn) * 13.5, 3 + Math.sin(turn) * 2.4, 0.6 + 0.3 * Math.sin(turn)];
};

const ring = (front: boolean): string =>
  Array.from({ length: DOTS }, (_, i) => dot(i)).filter(([, y]) => (y >= 3) === front).map(([x, y, r]) => ovalPath([x, y], r)).join('');

const PELAGO_SHADOW: BrandPiece = {
  name: 'Ring',
  w: 30,
  h: 6,
  paths: [
    { ink: '#7c4dff', opacity: 0.12, d: ovalPath([15, 3], 10, 1.6) },
    { ink: '#8f6bff', opacity: 0.5, d: ring(false) },
    { ink: '#8f6bff', opacity: 0.9, d: ring(true) },
  ],
};

export { PELAGO_SHADOW };
