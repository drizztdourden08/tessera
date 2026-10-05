/* @layer renderer-components @kind types */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { CompiledClip } from './sample.type';

interface ClipSource {
  kind: 'clip';
  id: MascotClip;
  clip: CompiledClip;
  start: number;
  loop: boolean;
  until: number;
  rate: number;
}

interface BlendSource {
  kind: 'blend';
  from: PoseSource;
  to: PoseSource;
  start: number;
  body: number;
  extras: number;
}

type PoseSource = ClipSource | BlendSource;

interface SourceContext {
  effects: ReadonlySet<string>;
  reduced: boolean;
}

export type { ClipSource, PoseSource, SourceContext };
