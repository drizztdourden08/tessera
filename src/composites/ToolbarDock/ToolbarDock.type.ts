/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { DockEdge } from '../DockLayout';
import type { ToolbarHandleProps, ToolbarOrientation } from '../Toolbar/Toolbar.type';

type ToolbarSide = DockEdge;

interface ToolbarDefinition {
  id: string;
  label: string;
  defaultSide: ToolbarSide;
  hiddenByDefault?: boolean;
}

interface ToolbarSpot {
  side: ToolbarSide;
  index: number;
}

interface ToolbarLayout {
  v: 1;
  sides: Record<ToolbarSide, string[]>;
  hidden: string[];
  last: Record<string, ToolbarSpot>;
}

type ToolbarDockHandle = ToolbarHandleProps & Record<`data-${string}`, string>;

interface ToolbarSlot {
  orientation: ToolbarOrientation;
  handle: ToolbarDockHandle;
  side: ToolbarSide;
}

interface ToolbarDockProps {
  layout: ToolbarLayout;
  onLayoutChange: (layout: ToolbarLayout) => void;
  definitions: readonly ToolbarDefinition[];
  renderToolbar: (id: string, slot: ToolbarSlot) => ReactNode;
  children?: ReactNode;
  className?: string;
}

export type { ToolbarDefinition, ToolbarDockHandle, ToolbarDockProps, ToolbarLayout, ToolbarSide, ToolbarSlot, ToolbarSpot };
