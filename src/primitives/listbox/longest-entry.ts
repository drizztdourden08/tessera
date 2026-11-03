/* @layer renderer-components @kind util */
import type { ListboxEntry } from './listbox-model.type';

const longestEntry = <T>(entries: readonly ListboxEntry<T>[]): ListboxEntry<T> | undefined =>
  entries.reduce<ListboxEntry<T> | undefined>((longest, entry) => (longest !== undefined && longest.label.length >= entry.label.length ? longest : entry), undefined);

export { longestEntry };
