/* @layer renderer-components @kind logic */
import type { ClipSource } from './pose-source.type';

const clipEnd = (source: ClipSource): number => {
  if (Number.isFinite(source.until)) return source.start + source.until / source.rate;
  return source.loop ? Infinity : source.start + source.clip.span / source.rate;
};

export { clipEnd };
