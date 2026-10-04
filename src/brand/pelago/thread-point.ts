/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import { threadControl } from './thread-control';

const threadPoint = (from: ScenePoint, to: ScenePoint, bulge: number, t: number): ScenePoint => {
  const [cx, cy] = threadControl(from, to, bulge);
  const u = 1 - t;
  return [u * u * from[0] + 2 * u * t * cx + t * t * to[0], u * u * from[1] + 2 * u * t * cy + t * t * to[1]];
};

export { threadPoint };
