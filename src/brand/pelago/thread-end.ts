/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { IsletId, ThreadEnd } from './pelago.type';
import { ORIGIN } from './pelago-geometry.constants';
import { PELAGO_RIG } from './pelago-rig.constants';

const threadEnd = (end: ThreadEnd, offsets: Partial<Record<IsletId, ScenePoint>> = {}): ScenePoint => {
  if (end === 'core') return PELAGO_RIG.core;
  const [x, y] = PELAGO_RIG.islets[end].node;
  const [dx, dy] = offsets[end] ?? ORIGIN;
  return [x + dx, y + dy];
};

export { threadEnd };
