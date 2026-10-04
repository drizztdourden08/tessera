/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { Polygon } from './pelago.type';

const movePolygon = (polygon: Polygon, [ax, ay]: ScenePoint, size = 1, mirror = false): ScenePoint[] =>
  polygon.map(([x, y]) => [ax + (mirror ? -x : x) * size, ay + y * size]);

export { movePolygon };
