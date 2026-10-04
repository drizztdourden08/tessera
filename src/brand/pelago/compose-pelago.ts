/* @layer renderer-components @kind logic */
import type { BrandPiece, BrandSceneData, MascotPose, ScenePoint } from '../brand.type';
import { groupNode } from '../scene/group-node';
import { placePiece } from '../scene/place-piece';
import { PELAGO_PIECES } from './pelago-pieces.constants';
import { PELAGO_RIG } from './pelago-rig.constants';
import type { PelagoRig } from './pelago.type';

const within = (value: number, reach: number): number => Math.min(reach, Math.max(-reach, value));

const handNode = (piece: BrandPiece, hand: PelagoRig['handLeft'], angle = 0) =>
  placePiece(piece, { at: hand.at, angle, origin: [hand.pivot[0] - hand.at[0], hand.pivot[1] - hand.at[1]] as ScenePoint });

const composePelago = (pose: MascotPose = {}): BrandSceneData => {
  const { sphereTop, sphereLeft, sphereRight, glint, eye, handLeft, handRight } = PELAGO_PIECES;
  const rig = PELAGO_RIG;
  const { top, left, right } = rig.spheres;
  const [lookX = 0, lookY = 0] = pose.look ?? [];
  const dx = within(lookX, rig.lookReach[0]);
  const dy = within(lookY, rig.lookReach[1]);
  const hands = pose.handAngles ?? pose.podAngles ?? {};
  const shine = (label: string, at: ScenePoint) => placePiece(glint, { at, label, angle: rig.glintAngle });
  return {
    width: rig.width,
    height: rig.height,
    smooth: true,
    nodes: [
      groupNode('Body', [
        groupNode('Spheres', [placePiece(sphereTop, { at: top.at }), placePiece(sphereLeft, { at: left.at }), placePiece(sphereRight, { at: right.at })], { goo: rig.goo }),
        groupNode('Glints', [shine('Top glint', top.glint), shine('Left glint', left.glint), shine('Right glint', right.glint)]),
      ]),
      handNode(handLeft, rig.handLeft, hands.left),
      handNode(handRight, rig.handRight, hands.right),
      groupNode('Eyes', rig.eyes.map(([x, y]) => placePiece(eye, { at: [x + dx, y + dy] }))),
    ],
  };
};

export { composePelago };
