/* @layer renderer-components @kind logic */
import type { BrandSceneData, SceneNode } from '../../brand.type';
import { RIG_PART, SHADOW_PART } from '../../motion/motion.constants';
import type { MascotAnimation, MascotMotion, MotionEffect } from '../../motion/motion.type';
import { groupNode } from '../../scene/group-node';
import { placePiece } from '../../scene/place-piece';

const partsOf = (clip: MascotAnimation | undefined): string[] => [...(clip?.tracks.map((t) => t.part) ?? []), ...(clip?.still ?? [])];

const stageScene = (scene: BrandSceneData, motion: MascotMotion, clip?: MascotAnimation): BrandSceneData => {
  const { top, right, bottom, left } = motion.stage;
  const wrap = (node: SceneNode): SceneNode => {
    const part = motion.parts.find((p) => p.node === node.label);
    const inner = node.kind === 'group' ? { ...node, children: node.children.map(wrap) } : node;
    return part ? groupNode(part.id, [inner], { part: part.id }) : inner;
  };
  const { shadow } = motion;
  const shown = clip?.still ?? [];
  const used = new Set([...partsOf(clip), ...partsOf(motion.ambient)]);
  const effects = (motion.effects ?? []).filter((e) => !clip || used.has(e.id));
  const light = (e: MotionEffect): SceneNode => groupNode(e.id, [placePiece(e.piece, { at: e.at })], { part: e.id, hidden: !shown.includes(e.id) });
  const ground = shadow ? [groupNode(SHADOW_PART, [placePiece(shadow.piece, { at: shadow.at })], { part: SHADOW_PART })] : [];
  const riding = effects.filter((e) => !e.fixed).map(light);
  const fixed = effects.filter((e) => e.fixed).map(light);
  const rig = groupNode(RIG_PART, [...scene.nodes.map(wrap), ...riding], { part: RIG_PART });
  return {
    width: scene.width + left + right,
    height: scene.height + top + bottom,
    nodes: [groupNode('Stage', [...ground, rig, ...fixed], { turn: { left, top, angle: 0, originX: 0, originY: 0 } })],
    ...(scene.smooth ? { smooth: true } : {}),
  };
};

export { stageScene };
