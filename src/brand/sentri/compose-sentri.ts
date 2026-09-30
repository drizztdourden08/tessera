/* @layer renderer-components @kind logic */
import type { BrandSceneData, MascotPose } from '../brand.type';
import { groupNode } from '../scene/group-node';
import { placePiece } from '../scene/place-piece';
import { SENTRI_PIECES } from './sentri-pieces.constants';
import { SENTRI_RIG } from './sentri-rig.constants';

const clamp = (v: number, limit: number): number => Math.max(-limit, Math.min(limit, Math.round(v)));

const composeSentri = (pose: MascotPose = {}): BrandSceneData => {
  const { body, visor, eye, podLeft, podRight } = SENTRI_PIECES;
  const rig = SENTRI_RIG;
  const [lookX = 0, lookY = 0] = pose.look ?? [];
  const dx = clamp(lookX, rig.lookReach[0]);
  const dy = clamp(lookY, rig.lookReach[1]);
  return {
    width: body.w,
    height: body.h,
    nodes: [
      placePiece(podLeft, { at: rig.podLeft.at, angle: pose.podAngles?.left ?? 0, origin: rig.podLeft.pivot }),
      placePiece(podRight, { at: rig.podRight.at, angle: pose.podAngles?.right ?? 0, origin: rig.podRight.pivot }),
      placePiece(body, { at: rig.body }),
      placePiece(visor, { at: rig.visor }),
      groupNode('Eyes', rig.eyes.map(([x, y]) => placePiece(eye, { at: [x + dx, y + dy] }))),
    ],
  };
};

export { composeSentri };
