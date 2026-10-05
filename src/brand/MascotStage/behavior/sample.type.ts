/* @layer renderer-components @kind types */
import type { ScenePoint } from '../../brand.type';
import type { MascotAnimation } from '../../motion/motion.type';

interface PartPose {
  x: number;
  y: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

type ClipPose = Map<string, PartPose>;

interface CompiledFrame {
  at: number;
  x: number;
  y: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  opacity: number | undefined;
  ease: (t: number) => number;
}

interface CompiledTrack {
  part: string;
  lag: number;
  frames: readonly CompiledFrame[];
}

interface CompiledClip {
  source: MascotAnimation;
  duration: number;
  loop: boolean;
  span: number;
  tracks: readonly CompiledTrack[];
  still: ReadonlySet<string>;
  pivots: ReadonlyMap<string, ScenePoint>;
}

type SampleFill = 'none' | 'hold';

type RestOf = (part: string, clip: CompiledClip) => number;

interface SampleTiming {
  duration: number;
  loop: boolean;
  fill: SampleFill;
}

export type { ClipPose, CompiledClip, CompiledFrame, CompiledTrack, PartPose, RestOf, SampleFill, SampleTiming };
