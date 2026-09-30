/* @layer renderer-components @kind util */
import type { EntryState, ListboxEntry, SelectionLimits } from './listbox-model.type';

const entryState = <T>(
  entry: ListboxEntry<T>,
  selectedIds: ReadonlySet<string>,
  count: number,
  limits: SelectionLimits,
): EntryState => {
  const selected = selectedIds.has(entry.identity);
  const multi = limits.max > 1;
  const blocked = multi && !selected && count >= limits.max;
  const locked = multi && selected && count <= limits.min;
  return { selected, disabled: entry.itemDisabled || blocked, locked };
};

export { entryState };
