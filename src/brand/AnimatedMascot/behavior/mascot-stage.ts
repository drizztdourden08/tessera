/* @layer renderer-components @kind logic */
import type { BrandMascot, BrandSceneData } from '../../brand.type';
import type { MascotAnimation } from '../../motion/motion.type';
import { stageScene } from './stage-scene';

const mascotStage = (mascot: BrandMascot | undefined, clip?: MascotAnimation): BrandSceneData | undefined =>
  (mascot?.motion ? stageScene(mascot.variants[0].compose(), mascot.motion, clip) : undefined);

export { mascotStage };
