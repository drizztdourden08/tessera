/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { PathStep } from './pelago-symbol.type';

const roundRect = ([x0, y0]: ScenePoint, [x1, y1]: ScenePoint, r: number): readonly PathStep[] => [
  ['M', x0 + r, y0],
  ['L', x1 - r, y0],
  ['Q', x1, y0, x1, y0 + r],
  ['L', x1, y1 - r],
  ['Q', x1, y1, x1 - r, y1],
  ['L', x0 + r, y1],
  ['Q', x0, y1, x0, y1 - r],
  ['L', x0, y0 + r],
  ['Q', x0, y0, x0 + r, y0],
  ['Z'],
];

export { roundRect };
