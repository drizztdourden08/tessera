/* @layer renderer-components @kind logic */
import { flatRects } from './flat-rects';
import { rowsOfRects } from './rows-of-rects';
import type { MarqueeItem } from '../../marquee';
import type { RowRectsInput } from './row-rects.type';

const rowRects = <T>(input: RowRectsInput<T>): readonly MarqueeItem[] =>
  rowsOfRects(input.items, flatRects(input), input.getRowId);

export { rowRects };
