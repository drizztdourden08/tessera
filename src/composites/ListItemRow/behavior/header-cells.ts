/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';
import type { ListItemColumnAlign, ListItemHeader, ListItemShape } from '../ListItemRow.type';
import type { HeaderCell } from './header-cells.type';

const headerCells = (header: ListItemHeader, shape: ListItemShape): HeaderCell[] => {
  const cells: HeaderCell[] = [];
  const add = (track: HeaderCell['track'], label: ReactNode, align: ListItemColumnAlign = 'start') => cells.push({ track, label, align });
  if (shape.icon) add('icon', header.icon);
  add('main', header.main);
  for (let at = 0; at < shape.columns; at += 1) add('column', header.columns?.[at]?.label, header.columns?.[at]?.align);
  if (shape.action) add('action', header.action, 'end');
  return cells;
};

export { headerCells };
