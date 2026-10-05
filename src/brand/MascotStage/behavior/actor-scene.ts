/* @layer renderer-components @kind logic */
import type { BrandSceneData, SceneNode } from '../../brand.type';
import { groupNode } from '../../scene/group-node';
import type { ActorRig } from './actor-rig.type';
import { UPRIGHT_PREFIX } from './upright.constants';

const actorScene = (rig: ActorRig, shown: ReadonlySet<string>): BrandSceneData => {
  const visit = (node: SceneNode): SceneNode => {
    if (node.kind !== 'group') return node;
    const children = node.children.map(visit);
    const part = node.part;
    const inner = part && rig.upright.has(part) ? [groupNode(`${node.label} upright`, children, { part: `${UPRIGHT_PREFIX}${part}` })] : children;
    const { hidden, ...rest } = node;
    return { ...rest, children: inner, ...(hidden && !(part && shown.has(part)) ? { hidden: true } : {}) };
  };
  return { ...rig.scene, nodes: rig.scene.nodes.map(visit) };
};

export { actorScene };
