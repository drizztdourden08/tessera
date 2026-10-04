/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';

const threadControl = ([ax, ay]: ScenePoint, [bx, by]: ScenePoint, bulge: number): ScenePoint => {
  const length = Math.hypot(bx - ax, by - ay) || 1;
  return [(ax + bx) / 2 + ((by - ay) / length) * bulge, (ay + by) / 2 + ((ax - bx) / length) * bulge];
};

export { threadControl };
