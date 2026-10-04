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
    const inner = node.kind === 'group' ? { ...node, children: node.children.map(wrap) } : node;
    return part ? groupNode(part.id, [inner], { part: part.id }) : inner;
  };
  const { shadow, effects = [] } = motion;
  const ground = shadow ? [groupNode(SHADOW_PART, [placePiece(shadow.piece, { at: shadow.at })], { part: SHADOW_PART })] : [];
  const lights = effects.map((e) => groupNode(e.id, [placePiece(e.piece, { at: e.at })], { part: e.id, hidden: true }));
  const rig = groupNode(RIG_PART, [...scene.nodes.map(wrap), ...lights], { part: RIG_PART });
  return {
    width: scene.width + left + right,
    height: scene.height + top + bottom,
    nodes: [groupNode('Stage', [...ground, rig], { turn: { left, top, angle: 0, originX: 0, originY: 0 } })],
    ...(scene.smooth ? { smooth: true } : {}),
  };
};

export { stageScene };
