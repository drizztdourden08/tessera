/* @layer renderer-components @kind logic */
import type { BrandSceneData, MascotPose } from '../brand.type';
import { groupNode } from '../scene/group-node';
import { placePiece } from '../scene/place-piece';
import { FLINT_PIECES } from './flint-pieces.constants';
import { FLINT_RIG } from './flint-rig.constants';

const within = (value: number, reach: number): number => Math.min(reach, Math.max(-reach, value));

const composeFlint = (pose: MascotPose = {}): BrandSceneData => {
  const { body, eye, mouth, handLeft, handRight } = FLINT_PIECES;
  const rig = FLINT_RIG;
  const [lookX = 0, lookY = 0] = pose.look ?? [];
  const dx = within(lookX, rig.lookReach[0]);
  const dy = within(lookY, rig.lookReach[1]);
  const hands = pose.handAngles ?? {};
  return {
    width: rig.size[0],
    height: rig.size[1],
    smooth: true,
    nodes: [
      placePiece(body, { at: rig.body }),
      groupNode('Eyes', rig.eyes.map(([x, y]) => placePiece(eye, { at: [x + dx, y + dy] }))),
      placePiece(mouth, { at: [rig.mouth[0] + dx / 2, rig.mouth[1] + dy / 2] }),
      placePiece(handLeft, { at: rig.handLeft.at, angle: hands.left ?? 0, origin: rig.handLeft.shoulder }),
      placePiece(handRight, { at: rig.handRight.at, angle: hands.right ?? 0, origin: rig.handRight.shoulder }),
    ],
  };
};

export { composeFlint };
