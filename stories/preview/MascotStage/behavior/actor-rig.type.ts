/* @layer stories @kind types */
import type { BrandMascot, BrandSceneData, ScenePoint } from '../../../../src/brand/brand.type';
import type { MascotClip } from '../../../../src/brand/motion/mascot-clip.type';
import type { MascotMotion } from '../../../../src/brand/motion/motion.type';
import type { CompiledClip } from '../sample/sample.type';

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
