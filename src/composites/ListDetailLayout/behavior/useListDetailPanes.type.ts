/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { PaneFold } from '../../pane-edge/pane-fold.type';
import type { EdgeHandle } from '../../pane-edge/pane-edge.type';

interface ListDetailPanes {
  panesRef: RefObject<HTMLElement | null>;
  listFold: PaneFold;
  detailFold: PaneFold;
  dragging: boolean;
  handle: EdgeHandle;
  columns: string;
}

export type { ListDetailPanes };
