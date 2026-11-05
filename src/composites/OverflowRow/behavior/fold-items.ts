/* @layer renderer-components @kind util */
import { DEFAULT_PRIORITY } from '../OverflowRow.constants';
import type { FoldInput } from '../OverflowRow.type';

const rowWidth = (widths: readonly number[], gap: number): number => widths.reduce((sum, width) => sum + width, 0) + gap * Math.max(widths.length - 1, 0);

const foldItems = (input: FoldInput): readonly string[] => {
  const { items, widths, moreWidth, gap, room } = input;
  const shown = items.map((item, index) => ({ item, width: widths[index] ?? 0 }));
  const folded: string[] = [];
  const needed = () => rowWidth([...shown.map((entry) => entry.width), ...(folded.length > 0 ? [moreWidth] : [])], gap);
  while (needed() > room) {
    let pick = -1;
    shown.forEach((entry, index) => {
      if (entry.item.pinned) return;
      const current = pick < 0 ? undefined : shown[pick]?.item;
      if (current === undefined || (entry.item.priority ?? DEFAULT_PRIORITY) <= (current.priority ?? DEFAULT_PRIORITY)) pick = index;
    });
    if (pick < 0) break;
    const [gone] = shown.splice(pick, 1);
    if (gone) folded.push(gone.item.id);
  }
  return folded;
};

export { foldItems };
