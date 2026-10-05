/* @layer renderer-components @kind util */
import type { ItemListSettle } from '../ItemList.type';
import { focusRow } from './focus-row';

const settleCreate = (settle: ItemListSettle): void => {
  const { rowIds, openedWith, selectedId, list, newButton } = settle;
  const row = selectedId === null || selectedId === openedWith ? -1 : rowIds.indexOf(selectedId);
  if (row === -1) newButton?.focus();
  else focusRow(list, row);
};

export { settleCreate };
