/* @layer renderer-components @kind hook */
import { useMemo, useRef } from 'react';
import { SHARE_STEP, SHARE_STEP_LARGE } from '../ListDetailLayout.constants';
import { columnsOf } from './columns-of';
import type { LayoutOptions } from './layout-options.type';
import { sharePixels } from './share-pixels';
import type { ListDetailPanes } from './useListDetailPanes.type';
import { useListWidth } from './useListWidth';
import { usePaneFold } from '../../pane-fold/usePaneFold';

const useListDetailPanes = (options: LayoutOptions): ListDetailPanes => {
  const { ratio } = options;
  const panesRef = useRef<HTMLElement>(null);
  const listFold = usePaneFold(options.collapse);
  const shownDetailFold = usePaneFold(options.detailCollapse);
  const { size, dragging, handle: sizeHandle } = useListWidth(options.width);
  const listFolded = listFold.collapsed;
  const detailFold = { ...shownDetailFold, collapsed: shownDetailFold.collapsed && !listFolded };
  const handle = useMemo(
    () => (ratio ? { ...sizeHandle, pixelsPerUnit: () => sharePixels(panesRef.current), step: SHARE_STEP, largeStep: SHARE_STEP_LARGE } : sizeHandle),
    [ratio, sizeHandle],
  );
  const columns = columnsOf({ size, ratio, listFolded, detailFolded: detailFold.collapsed });
  return { panesRef, listFold, detailFold, dragging, handle, columns };
};

export { useListDetailPanes };
