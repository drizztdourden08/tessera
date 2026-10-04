/* @layer renderer-components @kind logic */
import type { ActorRig } from './actor-rig.type';

/**
 * Screen pixels per frame unit, so the mascot's frame is as tall as its share of the stage. Pixel art takes
 * the largest whole number that fits, so every art pixel stays square and sharp.
 */
const actorScale = (rig: ActorRig, stageHeight: number, size = 1): number => {
  const fit = (stageHeight * size) / rig.scene.height;
  return rig.scene.smooth ? fit : Math.max(1, Math.floor(fit));
};

export { actorScale };
