/* @layer renderer-components @kind logic */
import { clickHandlers } from '../../virtual';
import type { MouseEvent } from 'react';
import type { VirtualListCellBind } from '../VirtualList.type';
import type { ListCellExtrasInput } from './list-cell-extras.type';

const listCellExtras = (input: ListCellExtrasInput): Partial<VirtualListCellBind> => {
  const { key, index, select, moving, selecting, onPick } = input;
  const dragged = moving.extrasOf(index, key);
  const pick = onPick ? (event: MouseEvent<HTMLElement>) => onPick(index, event) : undefined;
  if (selecting) return { ...dragged, ...clickHandlers(select, key, moving.swallowClick, pick) };
  if (!pick) return dragged;
  return {
    ...dragged,
    onClick: (event) => {
      if (!moving.swallowClick()) pick(event);
    },
  };
};

export { listCellExtras };
