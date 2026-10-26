/* @layer renderer-components @kind logic */
import type { MarqueeItem } from '../../marquee';
import type { Rect } from '../../rect-drag/rect-drag.type';
import type { FlatItem } from './flatten-rows.type';

const rowsOfRects = <T>(items: readonly FlatItem<T>[], rects: readonly Rect[], getRowId: (row: T) => string): readonly MarqueeItem[] =>
  items.flatMap((item, at) => {
    const rect = rects[at];
    return item.kind === 'row' && rect ? [{ key: getRowId(item.row), rect }] : [];
  });

export { rowsOfRects };
