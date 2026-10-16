/* @layer renderer-components @kind util */
import { MOVE_KEYS, ROW_KEYS } from '../ItemList.constants';
import type { ItemListKey } from '../ItemList.type';

const listKey = (input: ItemListKey): void => {
  const { event, buttons, rowIds, rename, remove, onSelect, onActivate } = input;
  const index = buttons.indexOf(event.target as HTMLElement);
  const id = rowIds[index];
  if (id === undefined) return;
  const kind = ROW_KEYS[event.key];
  const edit = kind && { rename, remove }[kind];
  if (edit) {
    event.preventDefault();
    edit(id);
    return;
  }
  const move = MOVE_KEYS[event.key];
  if (!move) return;
  event.preventDefault();
  const next = move(index, rowIds.length - 1);
  buttons[next]?.focus();
  if (!onActivate) onSelect?.(rowIds[next] ?? id);
};

export { listKey };
