/* @layer renderer-components @kind types */
import type { BrandMascot, BrandSceneData, ScenePoint } from '../../brand.type';
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { MascotMotion } from '../../motion/motion.type';
import type { CompiledClip } from './sample.type';

interface ActorRig {
  mascot: BrandMascot;
  motion: MascotMotion;
  scene: BrandSceneData;
  clips: ReadonlyMap<MascotClip, CompiledClip>;
  ambient: CompiledClip | undefined;
  effects: ReadonlySet<string>;
  pivots: ReadonlyMap<string, ScenePoint>;
  anchor: number;
  upright: ReadonlyMap<string, number>;
}

export type { ActorRig };
