/* @layer renderer-components @kind logic */
import type { BrandSceneData, MascotPose, ScenePieceNode, ScenePoint, SceneTurn } from '../brand.type';
import { groupNode } from '../scene/group-node';
import { nearSideOf } from '../scene/near-side-of';
import { placePiece } from '../scene/place-piece';
import { rightmost } from '../scene/rightmost';
import { turnPoint } from '../scene/turn-point';
import { composeSentri } from '../sentri/compose-sentri';
import { bagEffects } from './bag-effects';
import { HOOKSHOP_BAG } from './hookshop-bag.constants';
import { HOOKSHOP_EFFECTS } from './hookshop-effects.constants';
import { HOOKSHOP_RIG } from './hookshop-rig.constants';
import { HOOKSHOP_STAMP } from './hookshop-stamp.constants';
import { hookshotCurve } from './hookshot-curve';
import { layoutHookshot } from './layout-hookshot';

const turnOf = ({ left, top, angle, originX, originY }: SceneTurn): SceneTurn => ({ left, top, angle, originX, originY });

const centreOf = (turn: SceneTurn): ScenePoint => [turn.left + turn.originX, turn.top + turn.originY];

const placeBag = (tip: ScenePoint): ScenePieceNode => {
  const { scale, angle, catch: hold } = HOOKSHOP_RIG.bag;
  const origin: ScenePoint = [(HOOKSHOP_BAG.w * scale) / 2, (HOOKSHOP_BAG.h * scale) / 2];
  const held = turnPoint([hold[0] * scale, hold[1] * scale], origin, angle);
  return placePiece(HOOKSHOP_BAG, { at: [tip[0] - held[0], tip[1] - held[1]], scale, angle, origin });
};

const placeStamp = (): ScenePieceNode => {
  const { scale, stampCentre, stampAngle } = HOOKSHOP_RIG.bag;
  const { w, h } = HOOKSHOP_STAMP;
  const size = HOOKSHOP_RIG.stampScale;
  return placePiece(HOOKSHOP_STAMP, { at: [stampCentre[0] * scale - (w * size) / 2, stampCentre[1] * scale - (h * size) / 2], scale: size, angle: stampAngle });
};

const composeHookshop = (pose: MascotPose = {}): BrandSceneData => {
  const rig = HOOKSHOP_RIG;
  const sentri = composeSentri(pose);
  const bot: SceneTurn = { left: rig.sentri.at[0], top: rig.sentri.at[1], angle: rig.sentri.angle, originX: sentri.width / 2, originY: sentri.height / 2 };
  const onBot = ([x, y]: ScenePoint): ScenePoint => turnPoint([bot.left + x, bot.top + y], centreOf(bot), bot.angle);
  const hookshot = layoutHookshot(hookshotCurve(onBot(rig.sentri.pod), rig.hookshot.angle, rig.hookshot.length, rig.hookshot.bend));
  const bag = placeBag(hookshot.tip);
  const onBag = ([x, y]: ScenePoint): ScenePoint => turnPoint([bag.left + x * rig.bag.scale, bag.top + y * rig.bag.scale], centreOf(bag), bag.angle);
  const clip = nearSideOf(onBag(rig.bag.frontEdge[0]), onBag(rig.bag.frontEdge[1]));
  const { stars, speedLines } = bagEffects(onBag, rig.hookshot.angle + rig.hookshot.bend + 180);
  const { sparkle } = HOOKSHOP_EFFECTS;
  const apex = onBot([sentri.width / 2, 0]);
  const spark = placePiece(sparkle, { at: [apex[0] - sparkle.w / 2 + rig.sparkleNudge[0], apex[1] - sparkle.h / 2 + rig.sparkleNudge[1]] });
  return {
    width: Math.ceil(Math.max(...[bag, ...stars, ...speedLines].map(rightmost)) + rig.margin),
    height: rig.height,
    nodes: [
      groupNode('Sentri', sentri.nodes, { turn: bot }),
      groupNode('Stars', stars),
      bag,
      groupNode('Stamp', [placeStamp()], { turn: turnOf(bag) }),
      groupNode('Chain', hookshot.links, { clip }),
      groupNode('Handle', [hookshot.handle], { clip }),
      groupNode('Head', [hookshot.head], { clip }),
      spark,
      groupNode('Speed lines', speedLines),
    ],
  };
};

export { composeHookshop };
