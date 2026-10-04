/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';

const spline = ([a, b, c, d]: readonly [number, number, number, number], t: number): number =>
  0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (3 * b - a - 3 * c + d) * t * t * t);

const smoothRoute = (points: readonly ScenePoint[], steps: number): ScenePoint[] => {
  const at = (i: number): ScenePoint => points[Math.max(0, Math.min(points.length - 1, i))] ?? [0, 0];
  const legs = points.slice(1).flatMap((_, i) => {
    const [a, b, c, d] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    return Array.from({ length: steps }, (__, s): ScenePoint => {
      const t = (s + 1) / steps;
      return [spline([a[0], b[0], c[0], d[0]], t), spline([a[1], b[1], c[1], d[1]], t)];
    });
  });
  return [at(0), ...legs];
};

export { smoothRoute };
