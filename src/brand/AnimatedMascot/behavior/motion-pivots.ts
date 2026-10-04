/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../../brand.type';
import { RIG_PART, SHADOW_PART } from '../../motion/motion.constants';
import type { MascotMotion } from '../../motion/motion.type';

const motionPivots = (motion: MascotMotion): ReadonlyMap<string, ScenePoint> => {
  const { shadow, effects = [] } = motion;
  const pivots = new Map<string, ScenePoint>([[RIG_PART, motion.pivot], ...motion.parts.map((p) => [p.id, p.pivot] as const)]);
  for (const { id, piece, at } of effects) pivots.set(id, [at[0] + piece.w / 2, at[1] + piece.h / 2]);
  if (shadow) pivots.set(SHADOW_PART, [shadow.at[0] + shadow.piece.w / 2, shadow.at[1] + shadow.piece.h / 2]);
  return pivots;
};

export { motionPivots };
