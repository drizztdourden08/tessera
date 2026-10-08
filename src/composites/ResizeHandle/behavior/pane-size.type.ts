/* @layer renderer-components @kind types */
import type { ResizeHandleProps } from '../ResizeHandle.type';

interface PaneSizeOptions {
  initial: number;
  min: number;
  max: number;
  storageKey?: string;
}

type PaneSizeHandle = Required<Pick<ResizeHandleProps, 'value' | 'min' | 'max' | 'onResize' | 'onResizeEnd' | 'onDragChange' | 'onReset'>>;

interface PaneSize {
  size: number;
  dragging: boolean;
  reset: () => void;
  handle: PaneSizeHandle;
}

export type { PaneSize, PaneSizeHandle, PaneSizeOptions };
