/* @layer stories @kind logic */
import type { ActorRig } from './actor-rig.type';

const actorScale = (rig: ActorRig, stageHeight: number, size = 1): number => {
  const fit = (stageHeight * size) / rig.scene.height;
  return rig.scene.smooth ? fit : Math.max(1, Math.floor(fit));
};

export { actorScale };
