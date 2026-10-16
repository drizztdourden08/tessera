/* @layer renderer-components @kind logic */
import type { ItemListDeleteState } from './item-list-deletes.type';

const pruneDeletes = (state: ItemListDeleteState, present: ReadonlySet<string>): ItemListDeleteState => {
  const keep = (id: string) => present.has(id);
  if (state.pending.every(keep) && state.done.every(keep)) return state;
  return { pending: state.pending.filter(keep), done: state.done.filter(keep) };
};

export { pruneDeletes };
