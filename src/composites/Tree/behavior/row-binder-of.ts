/* @layer renderer-components @kind logic */
import type { MouseEvent } from 'react';
import type { TreeFlatRow } from '../Tree.type';
import { rowKeyDownOf } from './row-key-down-of';
import type { TreeRowBind, TreeRowBindInput } from './row-binder-of.type';

const click = <T,>(input: TreeRowBindInput<T>, event: MouseEvent<HTMLElement>, row: TreeFlatRow<T>): void => {
  const { nav, drag, expansion, openOnPick } = input;
  if (drag.swallowClick()) return;
  if (nav.mode === 'multiple') nav.select.click(row.key, event);
  else if (nav.mode === 'single') nav.pick(row.key);
  if (openOnPick && row.branch && !event.shiftKey && !event.ctrlKey && !event.metaKey) expansion.toggle(row.key);
};

const doubleClickOf = <T,>(input: TreeRowBindInput<T>, row: TreeFlatRow<T>): (() => void) | undefined => {
  if (!row.branch) return () => input.onActivate?.(row.item);
  return input.openOnPick ? undefined : () => input.expansion.toggle(row.key);
};

const rowBinderOf = <T,>(input: TreeRowBindInput<T>): ((at: number) => TreeRowBind | undefined) => {
  const { rows, nav, drag, expansion, selected } = input;
  const keyDown = rowKeyDownOf(input);
  return (at) => {
    const row = rows[at];
    if (!row) return undefined;
    const mark = drag.markOf(at);
    const picked = selected?.has(row.key) === true;
    return {
      tabIndex: at === nav.tabbable ? 0 : -1,
      selected: selected === undefined ? undefined : picked,
      mark,
      dragging: drag.dragging.has(row.key),
      state: { depth: row.depth, expanded: row.expanded, selected: picked, branch: row.branch, loading: row.loading, dropInto: mark === 'into' },
      pointer: drag.pointerOf(at),
      onFocus: () => nav.activate(row.key),
      onKeyDown: (event) => keyDown(event, at),
      onClick: (event) => click(input, event, row),
      onDoubleClick: doubleClickOf(input, row),
      onToggle: () => expansion.toggle(row.key),
    };
  };
};

export { rowBinderOf };
