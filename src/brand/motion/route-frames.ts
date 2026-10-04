/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import { EASE } from './motion.constants';
import type { MotionFrame } from './motion.type';

const round = (n: number): number => Number(n.toFixed(3));

const routeFrames = (route: readonly ScenePoint[], from: ScenePoint, span: readonly [start: number, end: number], ease: string = EASE.linear): MotionFrame[] => {
  const [start, end] = span;
  const legs = route.map((p, i) => {
    const before = route[i - 1] ?? p;
    return Math.hypot(p[0] - before[0], p[1] - before[1]);
  });
  const total = legs.reduce((sum, leg) => sum + leg, 0) || 1;
  return route.map(([x, y], i) => {
    const walked = legs.slice(0, i + 1).reduce((sum, leg) => sum + leg, 0);
    return { at: round(start + ((end - start) * walked) / total), x: round(x - from[0]), y: round(y - from[1]), opacity: 1, ease };
  });
};

export { routeFrames };
