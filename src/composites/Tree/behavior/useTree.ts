/* @layer renderer-components @kind hook */
import { useCallback, useImperativeHandle, useMemo } from 'react';
import { NO_SET } from '../Tree.constants';
import type { TreeProps } from '../Tree.type';
import { activeBranchOf } from './active-branch-of';
import { rowBinderOf } from './row-binder-of';
import { useTreeDrag } from './useTreeDrag';
import { useTreeDragOut } from './useTreeDragOut';
import { useTreeNav } from './useTreeNav';
import { useTreeRows } from './useTreeRows';
import type { TreeModel } from './useTree.type';

const useTree = <T,>(props: TreeProps<T>): TreeModel<T> => {
  const { items, getChildren, getLabel, selection, reorder, onDragOut, rowSize = 'normal', overscan, openOnPick = false, onActivate, guides = false, ref } = props;
  const { rows, keys, indexOfKey, expansion, filtering } = useTreeRows(props);
  const nav = useTreeNav({ rows, keys, indexOfKey, getLabel, selection, rowSize, overscan });
  const selected = selection?.selected;

  const childCount = useCallback((parentKey: string | null): number => {
    if (parentKey === null) return items.length;
    const row = rows[indexOfKey.get(parentKey) ?? -1];
    return row ? (getChildren(row.item)?.length ?? 0) : 0;
  }, [items, rows, indexOfKey, getChildren]);

  const drag = useTreeDrag({
    rows, indexOfKey, selected: selected ?? NO_SET, reorder, filtering, yieldsToDragOut: onDragOut !== undefined, rootRef: nav.rootRef, bodyRef: nav.bodyRef,
    rowHeight: nav.metrics.rowHeight, getLabel, childCount, setExpanded: expansion.setExpanded, jump: nav.jump,
  });
  const { dragOutOf } = useTreeDragOut({ rows, selected: selected ?? NO_SET, onDragOut, renderThumbnail: reorder?.renderThumbnail, reorderOn: drag.enabled });
  const bindOf = rowBinderOf({ rows, nav, drag, expansion, selected, openOnPick, onActivate, dragOutOf });
  const activeBranch = useMemo(() => (guides ? activeBranchOf(rows, indexOfKey, selected) : null), [guides, rows, indexOfKey, selected]);
  useImperativeHandle(ref, () => ({ scrollToKey: nav.scrollToKey }), [nav.scrollToKey]);

  return { rows, nav, drag, bindOf, activeBranch };
};

export { useTree };
