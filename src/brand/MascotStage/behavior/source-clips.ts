/* @layer renderer-components @kind logic */
import type { CompiledClip } from '../../motion/sample/sample.type';
import type { PoseSource } from './pose-source.type';

/** Every clip a source is drawing from right now. */
const sourceClips = (source: PoseSource): CompiledClip[] =>
  (source.kind === 'clip' ? [source.clip] : [...sourceClips(source.from), ...sourceClips(source.to)]);

export { sourceClips };
