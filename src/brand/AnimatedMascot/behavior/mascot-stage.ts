/* @layer renderer-components @kind logic */
import type { BrandMascot, BrandSceneData } from '../../brand.type';
import { stageScene } from './stage-scene';

const mascotStage = (mascot: BrandMascot | undefined): BrandSceneData | undefined =>
  (mascot?.motion ? stageScene(mascot.variants[0].compose(), mascot.motion) : undefined);

export { mascotStage };
