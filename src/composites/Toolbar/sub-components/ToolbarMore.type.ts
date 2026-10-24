/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ToolbarHandleProps, ToolbarItem } from '../Toolbar.type';

interface ToolbarMoreProps {
  folded: readonly ToolbarItem[];
}

interface ToolbarMeasureProps {
  measureRef: RefObject<HTMLDivElement | null>;
  items: readonly ToolbarItem[];
  handle: boolean;
  handleProps?: ToolbarHandleProps;
}

export type { ToolbarMeasureProps, ToolbarMoreProps };
