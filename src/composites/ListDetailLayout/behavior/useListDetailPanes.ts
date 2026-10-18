/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { columnsOf } from '../../pane-edge/columns-of';
import { foldedPaneOf } from '../../pane-edge/folded-pane-of';
import { paneEdgeOf } from '../../pane-edge/pane-edge-of';
import { usePaneFold } from '../../pane-edge/usePaneFold';
import type { LayoutOptions } from './layout-options.type';
import type { ListDetailPanes } from './useListDetailPanes.type';
import { useListWidth } from './useListWidth';

const useListDetailPanes = (options: LayoutOptions): ListDetailPanes => {
  const { ratio } = options;
  const panesRef = useRef<HTMLElement>(null);
  const listFold = usePaneFold(options.collapse);
  const ownDetailFold = usePaneFold(options.detailCollapse);
  const size = useListWidth(options.width);
  const shares = ratio ? { panes: panesRef, orientation: 'horizontal' as const } : undefined;
  const { handle, other } = paneEdgeOf({ edge: 'start', size, fold: listFold, other: ownDetailFold, shares });
  const detailFold = other ?? ownDetailFold;
  const folded = foldedPaneOf(listFold, detailFold);
  return { panesRef, listFold, detailFold, dragging: size.dragging, handle, columns: columnsOf({ size: size.size, shares: ratio, folded }) };
};

export { useListDetailPanes };
