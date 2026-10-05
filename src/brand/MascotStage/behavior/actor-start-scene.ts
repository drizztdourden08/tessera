/* @layer renderer-components @kind logic */
import type { BrandSceneData } from '../../brand.type';
import type { MascotClip } from '../../motion/mascot-clip.type';
import { actorScene } from './actor-scene';
import type { ActorRig } from './actor-rig.type';

const actorStartScene = (rig: ActorRig, first: MascotClip | undefined): BrandSceneData => {
  const rest = rig.motion.rest as MascotClip;
  const clip = rig.clips.get(first ?? rest) ?? rig.clips.get(rest);
  return actorScene(rig, clip?.still ?? new Set());
};

export { actorStartScene };
