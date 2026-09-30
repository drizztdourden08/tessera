/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';

const turnPoint = ([x, y]: ScenePoint, [cx, cy]: ScenePoint, deg: number): ScenePoint => {
  const rad = (deg * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c];
};

export { turnPoint };
