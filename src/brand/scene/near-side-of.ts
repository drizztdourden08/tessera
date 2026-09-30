/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import { FAR } from './scene.constants';

const nearSideOf = (a: ScenePoint, b: ScenePoint): ScenePoint[] => {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const dx = (b[0] - a[0]) / length;
  const dy = (b[1] - a[1]) / length;
  const top: ScenePoint = [a[0] - dx * FAR, a[1] - dy * FAR];
  const bottom: ScenePoint = [b[0] + dx * FAR, b[1] + dy * FAR];
  return [top, bottom, [bottom[0] - dy * FAR, bottom[1] + dx * FAR], [top[0] - dy * FAR, top[1] + dx * FAR]];
};

export { nearSideOf };
