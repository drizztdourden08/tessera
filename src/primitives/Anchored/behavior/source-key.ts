/* @layer renderer-components @kind util */
import type { AnchoredRectSource } from '../Anchored.type';

const sourceKey = (source: AnchoredRectSource | undefined): string => {
  if (source === undefined) return '';
  return typeof source === 'function' ? 'function' : `${source.left},${source.top},${source.width},${source.height}`;
};

export { sourceKey };
