/* @layer renderer-components @kind types */
import type { BrandMascot, BrandSceneData, ScenePoint } from '../../brand.type';
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { MascotMotion } from '../../motion/motion.type';
import type { CompiledClip } from '../../motion/sample/sample.type';

/** Everything about one mascot that does not change while it plays: compiled once per brand. */
interface ActorRig {
  mascot: BrandMascot;
  motion: MascotMotion;
  scene: BrandSceneData;
  clips: ReadonlyMap<MascotClip, CompiledClip>;
  ambient: CompiledClip | undefined;
  effects: ReadonlySet<string>;
  pivots: ReadonlyMap<string, ScenePoint>;
  /** The foot centre in frame units, the point that stands on x. */
  anchor: number;
  /** Groups of extras that stay unmirrored when the mascot faces left, each around its first member's centre. */
  upright: ReadonlyMap<string, number>;
}

export type { ActorRig };
