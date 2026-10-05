/* @layer renderer-components @kind logic */
import type { RowSpace } from './row-fits.type';

const rowFits = (space: RowSpace, withStrip: boolean): boolean => {
  const { widths, strip, gap, room } = space;
  const parts = [...widths, withStrip ? strip : 0].filter((width) => width > 0);
  const total = parts.reduce((sum, width) => sum + width, 0) + gap * Math.max(parts.length - 1, 0);
  return total <= room + 1;
};

export { rowFits };
