/* @layer renderer-components @kind logic */
import type { BrandPiece, ScenePieceNode, ScenePoint } from '../brand.type';
import { placePiece } from '../scene/place-piece';
import { turnPoint } from '../scene/turn-point';
import { DEG, ORIGIN } from './hookshop.constants';
import { HOOKSHOT_PIECES } from './hookshot-pieces.constants';
import { HOOKSHOT_RIG } from './hookshot-rig.constants';
import type { HookshotCurve, HookshotLayout } from './hookshop.type';
import { pinChain } from './pin-chain';

const angleOf = (a: ScenePoint, b: ScenePoint): number => Math.atan2(b[1] - a[1], b[0] - a[0]) * DEG;

const pinned = (piece: BrandPiece, anchor: ScenePoint, at: ScenePoint, angle: number): ScenePieceNode =>
  placePiece(piece, { at: [at[0] - anchor[0], at[1] - anchor[1]], angle, origin: anchor });

const layoutHookshot = (curve: HookshotCurve): HookshotLayout => {
  const rig = HOOKSHOT_RIG;
  const pieces = HOOKSHOT_PIECES;
  const pins = pinChain(curve, rig.linkFace.pinB[0] - rig.linkFace.pinA[0]);
  const chords = pins.slice(1).map((b, i) => ({ from: pins[i] ?? b, angle: angleOf(pins[i] ?? b, b) }));
  const faces = chords.filter((_, i) => i % 2 === 0).map(({ from, angle }) => pinned(pieces.linkFace, rig.linkFace.pinA, from, angle));
  const edges = chords.filter((_, i) => i % 2 === 1).map(({ from, angle }) => pinned(pieces.linkEdge, rig.linkEdge.pinA, from, angle));
  const endAngle = angleOf(curve[2], curve[3]);
  const toTip = turnPoint([rig.head.tip[0] - rig.head.back[0], rig.head.tip[1] - rig.head.back[1]], ORIGIN, endAngle);
  return {
    links: [...faces, ...edges],
    handle: pinned(pieces.handle, rig.handle.muzzle, curve[0], angleOf(curve[0], curve[1])),
    head: pinned(pieces.head, rig.head.back, curve[3], endAngle),
    tip: [curve[3][0] + toTip[0], curve[3][1] + toTip[1]],
  };
};

export { layoutHookshot };
