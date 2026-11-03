/* @layer renderer-components @kind util */
import { renderedIndices } from '../../data/row-window';
import type { RowRange } from '../../data/row-window';
import type { ListboxBlock } from './listbox-model.type';
import type { ListboxSlot } from './listbox-window.type';

const gapSlot = <T>(at: number, rows: number): ListboxSlot<T> => ({ at, rows, entry: undefined });

const pinnedIn = <T>(block: ListboxBlock<T>, active: number): number => {
  const local = active - (block.entries[0]?.index ?? 0);
  return local >= 0 && local < block.entries.length ? local : -1;
};

const blockSlots = <T>(block: ListboxBlock<T>, range: RowRange, active: number): ListboxSlot<T>[] => {
  const count = block.entries.length;
  const shown = { start: Math.min(range.start, count), end: Math.min(range.end, count) };
  const indices = renderedIndices(shown, pinnedIn(block, active));
  const slots: ListboxSlot<T>[] = [gapSlot(0, indices[0] ?? count)];
  indices.forEach((at, order) => {
    slots.push({ at, rows: 1, entry: block.entries[at] });
    const next = indices[order + 1] ?? count;
    if (next > at + 1) slots.push(gapSlot(at + 1, next - at - 1));
  });
  return slots;
};

export { blockSlots };
