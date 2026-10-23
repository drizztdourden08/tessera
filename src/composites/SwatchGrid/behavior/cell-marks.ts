/* @layer renderer-components @kind util */
import type { SwatchCellProps } from '../SwatchGrid.type';

const cellMarks = ({ index, total, inRange, secondary, drag }: Pick<SwatchCellProps, 'index' | 'total' | 'inRange' | 'secondary' | 'drag'>) => ({
  'data-range': inRange ? 'yes' : undefined,
  'data-secondary': secondary ? 'yes' : undefined,
  'data-drop': drag?.dropMark(index, total),
  'data-dragging': drag?.dragging === index ? 'yes' : undefined,
});

export { cellMarks };
