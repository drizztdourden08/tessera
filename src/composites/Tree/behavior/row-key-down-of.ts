/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import type { TreeFlatRow, TreeKeyMove } from '../Tree.type';
import { treeKeyMove } from './tree-key-move';
import type { TreeRowBindInput } from './row-binder-of.type';

const typing = (event: KeyboardEvent<HTMLElement>): boolean =>
  event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

const choose = <T,>(input: TreeRowBindInput<T>, event: KeyboardEvent<HTMLElement>, row: TreeFlatRow<T>): void => {
  const { nav, expansion, openOnPick, onActivate } = input;
  event.preventDefault();
  const enter = event.key === 'Enter';
  if (!enter && nav.mode === 'multiple') {
    nav.select.onKeyDown(event, row.key);
    return;
  }
  if (nav.mode === 'single') nav.pick(row.key);
  if (row.branch && openOnPick) expansion.toggle(row.key);
  else if (enter) onActivate?.(row.item);
};

const fold = <T,>(input: TreeRowBindInput<T>, move: TreeKeyMove): boolean => {
  const { rows, expansion } = input;
  if (move.kind === 'expand' || move.kind === 'collapse') {
    expansion.setExpanded(move.key, move.kind === 'expand');
    return true;
  }
  if (move.kind !== 'siblings') return false;
  expansion.setMany(rows.filter((sibling) => sibling.parentKey === move.key && sibling.branch).map((sibling) => sibling.key), true);
  return true;
};

const rowKeyDownOf = <T,>(input: TreeRowBindInput<T>) => (event: KeyboardEvent<HTMLElement>, at: number): void => {
  const { rows, nav, drag } = input;
  const row = rows[at];
  if (!row || event.target !== event.currentTarget || drag.keyMove(event, at)) return;
  const move = treeKeyMove(event.key, rows, at);
  if (move.kind === 'select') {
    choose(input, event, row);
    return;
  }
  if (fold(input, move)) {
    event.preventDefault();
    return;
  }
  if (nav.mode === 'multiple' || typing(event)) nav.select.onKeyDown(event, row.key);
  nav.navigate(event, at);
};

export { rowKeyDownOf };
