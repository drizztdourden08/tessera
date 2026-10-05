/* @layer renderer-components @kind logic */
import type { ClipSource, PoseSource } from './pose-source.type';

const finalClip = (source: PoseSource): ClipSource => (source.kind === 'clip' ? source : finalClip(source.to));

export { finalClip };
