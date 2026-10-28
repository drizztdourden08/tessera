/* @layer renderer-components @kind logic */
import type { TreeFlatRow, TreeKeyMove } from '../Tree.type';

const focusAt = (index: number, count: number): TreeKeyMove =>
  ({ kind: 'focus', index: Math.max(0, Math.min(count - 1, index)) });

const moveRight = <T,>(rows: readonly TreeFlatRow<T>[], index: number): TreeKeyMove => {
  const row = rows[index];
  if (!row?.branch) return { kind: 'none' };
  if (!row.expanded) return { kind: 'expand', key: row.key };
  return rows[index + 1]?.parentKey === row.key ? focusAt(index + 1, rows.length) : { kind: 'none' };
};

const moveLeft = <T,>(rows: readonly TreeFlatRow<T>[], index: number): TreeKeyMove => {
  const row = rows[index];
  if (!row) return { kind: 'none' };
  if (row.branch && row.expanded) return { kind: 'collapse', key: row.key };
  for (let at = index - 1; at >= 0; at -= 1) if (rows[at]?.key === row.parentKey) return focusAt(at, rows.length);
  return { kind: 'none' };
};

const treeKeyMove = <T,>(key: string, rows: readonly TreeFlatRow<T>[], index: number, page = 10): TreeKeyMove => {
  switch (key) {
    case 'ArrowDown': return focusAt(index + 1, rows.length);
    case 'ArrowUp': return focusAt(index - 1, rows.length);
    case 'PageDown': return focusAt(index + page, rows.length);
    case 'PageUp': return focusAt(index - page, rows.length);
    case 'Home': return focusAt(0, rows.length);
    case 'End': return focusAt(rows.length - 1, rows.length);
    case 'ArrowRight': return moveRight(rows, index);
    case 'ArrowLeft': return moveLeft(rows, index);
    case '*': return rows[index] ? { kind: 'siblings', key: rows[index].parentKey } : { kind: 'none' };
    case 'Enter':
    case ' ': return { kind: 'select', index };
    default: return { kind: 'none' };
  }
};

export { treeKeyMove };
