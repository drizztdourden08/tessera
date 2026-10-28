/* @layer renderer-components @kind logic */
import type { KeyboardEvent, MouseEvent } from 'react';
import type { TreeFlatRow } from '../Tree.type';
import { treeKeyMove } from './tree-key-move';
import type { TreeRowBind, TreeRowBindInput } from './row-binder-of.type';

const typing = (event: KeyboardEvent<HTMLElement>): boolean =>
  event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

const rowBinderOf = <T,>(input: TreeRowBindInput<T>): ((at: number) => TreeRowBind | undefined) => {
  const { rows, nav, drag, expansion, selected, openOnPick, onActivate } = input;

  const choose = (event: KeyboardEvent<HTMLElement>, row: TreeFlatRow<T>): void => {
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

  const keyDown = (event: KeyboardEvent<HTMLElement>, at: number): void => {
    const row = rows[at];
    if (!row || event.target !== event.currentTarget || drag.keyMove(event, at)) return;
    const move = treeKeyMove(event.key, rows, at);
    if (move.kind === 'expand' || move.kind === 'collapse') {
      event.preventDefault();
      expansion.setExpanded(move.key, move.kind === 'expand');
      return;
    }
    if (move.kind === 'siblings') {
      event.preventDefault();
      expansion.setMany(rows.filter((sibling) => sibling.parentKey === move.key && sibling.branch).map((sibling) => sibling.key), true);
      return;
    }
    if (move.kind === 'select') {
      choose(event, row);
      return;
    }
    if (nav.mode === 'multiple' || typing(event)) nav.select.onKeyDown(event, row.key);
    nav.navigate(event, at);
  };

  const click = (event: MouseEvent<HTMLElement>, row: TreeFlatRow<T>): void => {
    if (drag.swallowClick()) return;
    if (nav.mode === 'multiple') nav.select.click(row.key, event);
    else if (nav.mode === 'single') nav.pick(row.key);
    if (openOnPick && row.branch && !event.shiftKey && !event.ctrlKey && !event.metaKey) expansion.toggle(row.key);
  };

  return (at) => {
    const row = rows[at];
    if (!row) return undefined;
    const mark = drag.markOf(at);
    const picked = selected?.has(row.key);
    return {
      tabIndex: at === nav.tabbable ? 0 : -1,
      selected: selected === undefined ? undefined : picked === true,
      mark,
      dragging: drag.dragging.has(row.key),
      state: { depth: row.depth, expanded: row.expanded, selected: picked === true, branch: row.branch, loading: row.loading, dropInto: mark === 'into' },
      pointer: drag.pointerOf(at),
      onFocus: () => nav.activate(row.key),
      onKeyDown: (event) => keyDown(event, at),
      onClick: (event) => click(event, row),
      onDoubleClick: row.branch
        ? (openOnPick ? undefined : () => expansion.toggle(row.key))
        : () => onActivate?.(row.item),
      onToggle: () => expansion.toggle(row.key),
    };
  };
};

export { rowBinderOf };
