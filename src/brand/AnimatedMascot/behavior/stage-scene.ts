/* @layer renderer-components @kind logic */
import type { BrandSceneData, SceneNode } from '../../brand.type';
import { RIG_PART, SHADOW_PART } from '../../motion/motion.constants';
import type { MascotMotion } from '../../motion/motion.type';
import { groupNode } from '../../scene/group-node';
import { placePiece } from '../../scene/place-piece';

const stageScene = (scene: BrandSceneData, motion: MascotMotion): BrandSceneData => {
  const { top, right, bottom, left } = motion.stage;
  const wrap = (node: SceneNode): SceneNode => {
    const part = motion.parts.find((p) => p.node === node.label);
    return part ? groupNode(part.id, [node], { part: part.id }) : node;
  };
  const { shadow } = motion;
  const ground = shadow ? [groupNode(SHADOW_PART, [placePiece(shadow.piece, { at: shadow.at })], { part: SHADOW_PART })] : [];
  const rig = groupNode(RIG_PART, scene.nodes.map(wrap), { part: RIG_PART });
  return {
    width: scene.width + left + right,
    height: scene.height + top + bottom,
    nodes: [groupNode('Stage', [...ground, rig], { turn: { left, top, angle: 0, originX: 0, originY: 0 } })],
    ...(scene.smooth ? { smooth: true } : {}),
  };
};

export { stageScene };
