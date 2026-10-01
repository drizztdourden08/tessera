/* @layer renderer-components @kind util */
import type { Thumb } from './useRangeThumbs.type';

const nearestThumb = (at: number, low: number, high: number): Thumb => {
  if (at < low) return 'low';
  if (at > high) return 'high';
  return at - low < high - at ? 'low' : 'high';
};

export { nearestThumb };
