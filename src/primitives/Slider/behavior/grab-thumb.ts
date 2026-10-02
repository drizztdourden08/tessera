/* @layer renderer-components @kind util */
import { nearestThumb } from './nearest-thumb';
import type { Grab } from './useRangeDrag.type';

const grabThumb = (at: number, low: number, high: number, reach: number): Grab | null => {
  const onLow = Math.abs(at - low) <= reach;
  const onHigh = Math.abs(at - high) <= reach;
  if (onLow && onHigh) return low === high ? 'both' : nearestThumb(at, low, high);
  if (onLow) return 'low';
  return onHigh ? 'high' : null;
};

export { grabThumb };
