/* @layer renderer-components @kind logic */
import type { ScenePieceNode, ScenePoint } from '../brand.type';
import { placePiece } from '../scene/place-piece';
import { HOOKSHOP_EFFECTS } from './hookshop-effects.constants';
import { HOOKSHOP_RIG } from './hookshop-rig.constants';
import type { BagEffects } from './hookshop.type';

const bagEffects = (onBag: (p: ScenePoint) => ScenePoint, trail: number): BagEffects => {
  const { star, speedLine: line } = HOOKSHOP_EFFECTS;
  const stars = HOOKSHOP_RIG.stars.map((p): ScenePieceNode => {
    const [x, y] = onBag(p);
    return placePiece(star, { at: [x - star.w / 2, y - star.h / 2] });
  });
  const speedLines = HOOKSHOP_RIG.speedLines.map(({ from, spread }): ScenePieceNode => {
    const [x, y] = onBag(from);
    return placePiece(line, { at: [x - line.w, y - line.h / 2], angle: trail + spread, origin: [line.w, line.h / 2] });
  });
  return { stars, speedLines };
};

export { bagEffects };
