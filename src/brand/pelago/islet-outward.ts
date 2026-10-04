/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { IsletId } from './pelago.type';
import { PELAGO_RIG } from './pelago-rig.constants';

const isletOutward = (id: IsletId, by = 1): ScenePoint => {
  const [cx, cy] = PELAGO_RIG.core;
  const [x, y] = PELAGO_RIG.islets[id].node;
  const length = Math.hypot(x - cx, y - cy);
  return [Number((((x - cx) / length) * by).toFixed(3)), Number((((y - cy) / length) * by).toFixed(3))];
};

export { isletOutward };
