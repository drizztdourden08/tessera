/* @layer renderer-components @kind logic */
import type { SignalFitInput } from './signal-fit.type';

const span = (widths: readonly number[], count: number, gap: number): number =>
  widths.slice(0, count).reduce((total, width) => total + width, 0) + gap * Math.max(count - 1, 0);

const fitCount = (input: SignalFitInput): number => {
  const { widths, gap, more, room, capped } = input;
  if (!capped && span(widths, widths.length, gap) <= room) return widths.length;
  for (let count = widths.length; count > 0; count -= 1) {
    if (span(widths, count, gap) + gap + more <= room) return count;
  }
  return 0;
};

export { fitCount };
