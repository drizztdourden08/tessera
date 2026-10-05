/* @layer renderer-components @kind logic */
import type { ClipPoint, TourBox } from './tour-internal.type';

const cut = (points: readonly ClipPoint[], axis: 0 | 1, at: number, keepAbove: boolean): ClipPoint[] => {
  const inside = (point: ClipPoint): boolean => (keepAbove ? point[axis] >= at : point[axis] <= at);
  const cross = (a: ClipPoint, b: ClipPoint): ClipPoint => {
    const t = (at - a[axis]) / (b[axis] - a[axis]);
    const across = axis === 0 ? 1 : 0;
    const other = a[across] + t * (b[across] - a[across]);
    return axis === 0 ? [at, other] : [other, at];
  };
  return points.flatMap((point, index) => {
    const prev = points[(index + points.length - 1) % points.length] ?? point;
    if (inside(point)) return inside(prev) ? [point] : [cross(prev, point), point];
    return inside(prev) ? [cross(prev, point)] : [];
  });
};

const clipToBox = (points: readonly ClipPoint[], box: TourBox): ClipPoint[] => {
  const left = cut(points, 0, box.x, true);
  const right = cut(left, 0, box.x + box.width, false);
  const top = cut(right, 1, box.y, true);
  return cut(top, 1, box.y + box.height, false);
};

export { clipToBox };
