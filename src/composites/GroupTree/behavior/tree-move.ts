/* @layer renderer-components @kind logic */
import type { TreeMove, TreeRow } from '../GroupTree.type';

const focusAt = (index: number, count: number): TreeMove =>
  ({ kind: 'focus', index: Math.max(0, Math.min(count - 1, index)) });

const moveRight = <T,>(rows: readonly TreeRow<T>[], index: number): TreeMove => {
  const row = rows[index];
  if (row?.kind !== 'group') return { kind: 'none' };
  if (!row.expanded) return { kind: 'expand', key: row.key };
  return rows[index + 1]?.parentKey === row.key ? focusAt(index + 1, rows.length) : { kind: 'none' };
};

const moveLeft = <T,>(rows: readonly TreeRow<T>[], index: number): TreeMove => {
  const row = rows[index];
  if (!row) return { kind: 'none' };
  if (row.kind === 'group' && row.expanded) return { kind: 'collapse', key: row.key };
  const parent = rows.findIndex((candidate) => candidate.key === row.parentKey);
  return parent < 0 ? { kind: 'none' } : focusAt(parent, rows.length);
};

const treeMove = <T,>(key: string, rows: readonly TreeRow<T>[], index: number): TreeMove => {
  switch (key) {
    case 'ArrowDown': return focusAt(index + 1, rows.length);
    case 'ArrowUp': return focusAt(index - 1, rows.length);
    case 'Home': return focusAt(0, rows.length);
    case 'End': return focusAt(rows.length - 1, rows.length);
    case 'ArrowRight': return moveRight(rows, index);
    case 'ArrowLeft': return moveLeft(rows, index);
    case 'Enter':
    case ' ': return { kind: 'select', index };
    default: return { kind: 'none' };
  }
};

export { treeMove };
