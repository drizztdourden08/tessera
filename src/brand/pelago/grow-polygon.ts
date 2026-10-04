/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { Polygon } from './pelago.type';
import { MITER } from './pelago-geometry.constants';

const corner = (polygon: Polygon, i: number): ScenePoint => polygon[(i + polygon.length) % polygon.length] ?? [0, 0];

const signedArea = (polygon: Polygon): number =>
  polygon.reduce((sum, [x, y], i) => {
    const [nx, ny] = corner(polygon, i + 1);
    return sum + x * ny - nx * y;
  }, 0);

const growPolygon = (polygon: Polygon, by: number): ScenePoint[] => {
  const side = signedArea(polygon) > 0 ? 1 : -1;
  const normal = ([ax, ay]: ScenePoint, [bx, by2]: ScenePoint): ScenePoint => {
    const length = Math.hypot(bx - ax, by2 - ay) || 1;
    return [(side * (by2 - ay)) / length, (side * (ax - bx)) / length];
  };
  return polygon.map((p, i) => {
    const a = normal(corner(polygon, i - 1), p);
    const b = normal(p, corner(polygon, i + 1));
    const length = Math.hypot(a[0] + b[0], a[1] + b[1]) || 1;
    const mx = (a[0] + b[0]) / length;
    const my = (a[1] + b[1]) / length;
    const reach = by * Math.min(MITER, 1 / Math.max(1 / MITER, mx * a[0] + my * a[1]));
    return [p[0] + mx * reach, p[1] + my * reach];
  });
};

export { growPolygon };
