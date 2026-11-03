/* @layer renderer-components @kind util */
import type { PlayRange } from '../PixelPlayer.type';

const clamp = (value: number, last: number): number => Math.min(Math.max(Math.round(value), 0), last);

const playbackRange = (count: number, tagFrom: number | undefined, tagTo: number | undefined): PlayRange => {
  const last = Math.max(0, count - 1);
  if (tagFrom === undefined || tagTo === undefined) return { from: 0, to: last };
  const from = clamp(Math.min(tagFrom, tagTo), last);
  return { from, to: Math.max(from, clamp(Math.max(tagFrom, tagTo), last)) };
};

export { playbackRange };
