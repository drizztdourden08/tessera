/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { PaneSizeHandle } from '../../ResizeHandle/behavior/pane-size.type';
import type { ResizeHandleProps } from '../../ResizeHandle/ResizeHandle.type';
import type { PaneFold } from './usePaneFold.type';

type ListHandle = PaneSizeHandle & Partial<Pick<ResizeHandleProps, 'pixelsPerUnit' | 'step' | 'largeStep'>>;

interface ListDetailPanes {
  panesRef: RefObject<HTMLElement | null>;
  listFold: PaneFold;
  detailFold: PaneFold;
  dragging: boolean;
  handle: ListHandle;
  columns: string;
}

export type { ListDetailPanes, ListHandle };
