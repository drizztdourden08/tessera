/* @layer renderer-components @kind logic */
import type { Polygon } from './pelago.type';
import type { PathStep } from './pelago-symbol.type';

const round = (n: number): number => Number(n.toFixed(3));

const polySteps = (polygon: Polygon): readonly PathStep[] => [
  ...polygon.map(([x, y], i): PathStep => [i === 0 ? 'M' : 'L', round(x), round(y)]),
  ['Z'],
];

export { polySteps };
