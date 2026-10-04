/* @layer renderer-components @kind logic */
import type { StackedBarPart } from '../StackedBar.type';
import { SHARE_DIGITS } from './bar-tracks.constants';
import type { BarTracks } from './bar-tracks.type';

const shareOf = (value: number, capacity: number): number => Math.round((value / capacity) * SHARE_DIGITS) / SHARE_DIGITS;

const barTracks = (parts: readonly StackedBarPart[], total?: number): BarTracks => {
  const used = parts.reduce((sum, part) => sum + part.value, 0);
  const capacity = Math.max(used, total ?? 0);
  if (capacity <= 0) return { columns: '', capacity: 0, free: 0 };
  const free = capacity - used;
  const shares = parts.map((part) => `${shareOf(part.value, capacity)}fr`);
  if (free > 0) shares.push(`${shareOf(free, capacity)}fr`);
  return { columns: shares.join(' '), capacity, free };
};

export { barTracks };
