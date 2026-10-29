/* @layer renderer-components @kind logic */
import type { TreeFlatRow, TreeKeyMove } from '../Tree.type';
import { FOCUS_STEPS, NONE } from './tree-key-move.constants';

const focusAt = (index: number, count: number): TreeKeyMove =>
  ({ kind: 'focus', index: Math.max(0, Math.min(count - 1, index)) });

const moveRight = <T,>(rows: readonly TreeFlatRow<T>[], index: number): TreeKeyMove => {
  const row = rows[index];
  if (!row?.branch) return NONE;
  if (!row.expanded) return { kind: 'expand', key: row.key };
  return rows[index + 1]?.parentKey === row.key ? focusAt(index + 1, rows.length) : NONE;
};

const moveLeft = <T,>(rows: readonly TreeFlatRow<T>[], index: number): TreeKeyMove => {
  const row = rows[index];
  if (!row) return NONE;
  if (row.branch && row.expanded) return { kind: 'collapse', key: row.key };
  for (let at = index - 1; at >= 0; at -= 1) if (rows[at]?.key === row.parentKey) return focusAt(at, rows.length);
  return NONE;
};

const treeKeyMove = <T,>(key: string, rows: readonly TreeFlatRow<T>[], index: number, page = 10): TreeKeyMove => {
  const step = FOCUS_STEPS[key];
  if (step) return focusAt(step(index, rows.length, page), rows.length);
  if (key === 'ArrowRight') return moveRight(rows, index);
  if (key === 'ArrowLeft') return moveLeft(rows, index);
  if (key === '*') return rows[index] ? { kind: 'siblings', key: rows[index].parentKey } : NONE;
  return key === 'Enter' || key === ' ' ? { kind: 'select', index } : NONE;
};

export { treeKeyMove };
