/* @layer renderer-components @kind logic */
import type { CompiledClip } from './sample.type';
import type { PoseSource } from './pose-source.type';

const sourceClips = (source: PoseSource): CompiledClip[] =>
  (source.kind === 'clip' ? [source.clip] : [...sourceClips(source.from), ...sourceClips(source.to)]);

export { sourceClips };
