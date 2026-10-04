/* @layer renderer-components @kind types */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { CompiledClip } from '../../motion/sample/sample.type';

/** One clip playing from a start time on the stage clock. */
interface ClipSource {
  kind: 'clip';
  id: MascotClip;
  clip: CompiledClip;
  start: number;
  loop: boolean;
  /** Elapsed milliseconds where a counted loop holds its last frame. */
  until: number;
  rate: number;
}

/** A cross-fade from whatever was showing to a new source; nests when a blend is interrupted. */
interface BlendSource {
  kind: 'blend';
  from: PoseSource;
  to: PoseSource;
  start: number;
  body: number;
  extras: number;
}

type PoseSource = ClipSource | BlendSource;

/** What a source needs to know about the mascot to be sampled. */
interface SourceContext {
  effects: ReadonlySet<string>;
  reduced: boolean;
}

export type { BlendSource, ClipSource, PoseSource, SourceContext };
