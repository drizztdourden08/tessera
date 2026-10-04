/* @layer renderer-components @kind logic */
import type { MascotPose, ScenePoint } from '../brand.type';
import { turnPoint } from '../scene/turn-point';
import type { IsletId } from './pelago.type';
import { HAND_SIDES } from './pelago-geometry.constants';
import { PELAGO_RIG } from './pelago-rig.constants';

const isletOffsets = (pose: MascotPose): Record<IsletId, ScenePoint> => {
  const { core, islets, orbit } = PELAGO_RIG;
  const angles = pose.handAngles ?? pose.podAngles ?? {};
  const offset = (id: IsletId): ScenePoint => {
    const side = HAND_SIDES[id];
    const turn = Math.min(orbit.reach, Math.max(-orbit.reach, (side ? angles[side] ?? 0 : 0) * orbit.perDegree));
    const [x, y] = turnPoint(islets[id].node, core, turn);
    return [x - islets[id].node[0], y - islets[id].node[1]];
  };
  return { a: offset('a'), b: offset('b'), c: offset('c'), d: offset('d') };
};

export { isletOffsets };
