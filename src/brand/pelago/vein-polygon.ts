/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { Polygon } from './pelago.type';
import { VEIN_TIP } from './pelago-geometry.constants';

const veinPolygon = (line: Polygon, width: number): ScenePoint[] => {
  const last = line.length - 1;
  const sides = line.map(([x, y], i): readonly [ScenePoint, ScenePoint] => {
    const [ax, ay] = line[Math.max(0, i - 1)] ?? [x, y];
    const [bx, by] = line[Math.min(last, i + 1)] ?? [x, y];
    const length = Math.hypot(bx - ax, by - ay) || 1;
    const half = (width * (1 - (i / last) * (1 - VEIN_TIP))) / 2;
    const nx = ((by - ay) / length) * half;
    const ny = ((ax - bx) / length) * half;
    return [[x + nx, y + ny], [x - nx, y - ny]];
  });
  return [...sides.map(([left]) => left), ...sides.map(([, right]) => right).reverse()];
};

export { veinPolygon };
