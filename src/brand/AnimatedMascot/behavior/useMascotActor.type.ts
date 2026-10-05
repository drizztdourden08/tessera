/* @layer renderer-components @kind types */
import type { BrandSceneData } from '../../brand.type';
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { AnimatedMascotActorProps } from '../sub-components/AnimatedMascotActor.type';

interface MascotActorOptions extends AnimatedMascotActorProps {
  rest: MascotClip;
  scene: BrandSceneData | undefined;
}

export type { MascotActorOptions };
