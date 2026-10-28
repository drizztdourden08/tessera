/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { DockEdge } from '../DockLayout';
import type { ToolbarColumns, ToolbarHandleProps, ToolbarMenuSide, ToolbarOrientation } from '../Toolbar/Toolbar.type';

type ToolbarSide = DockEdge;

type ToolbarCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type ToolbarCornerClaim = 'h' | 'v';

interface ToolbarDefinition {
  id: string;
  label: string;
  defaultSide: ToolbarSide;
  hiddenByDefault?: boolean;
}

interface ToolbarPlace {
  id: string;
  start: number;
  size: number;
}

interface ToolbarSpot {
  side: ToolbarSide;
  lane: number;
  start: number;
  size: number;
}

interface ToolbarLayout {
  v: 2;
  sides: Record<ToolbarSide, ToolbarPlace[][]>;
  corners: Record<ToolbarCorner, ToolbarCornerClaim[]>;
  hidden: string[];
  last: Record<string, ToolbarSpot>;
  labels?: Record<string, boolean>;
  items?: Record<string, string[]>;
  columns?: Record<string, ToolbarColumns>;
}

type ToolbarDockHandle = ToolbarHandleProps & Record<`data-${string}`, string>;

interface ToolbarSlot {
  orientation: ToolbarOrientation;
  handle: ToolbarDockHandle;
  side: ToolbarSide;
  menuSide: ToolbarMenuSide;
  labels?: boolean;
  hiddenItems?: readonly string[];
  columns?: ToolbarColumns;
}

interface ToolbarDockProps {
  layout: ToolbarLayout;
  onLayoutChange: (layout: ToolbarLayout) => void;
  definitions: readonly ToolbarDefinition[];
  renderToolbar: (id: string, slot: ToolbarSlot) => ReactNode;
  children?: ReactNode;
  className?: string;
}

export type {
  ToolbarCorner, ToolbarCornerClaim, ToolbarDefinition, ToolbarDockHandle, ToolbarDockProps, ToolbarLayout, ToolbarPlace, ToolbarSide, ToolbarSlot, ToolbarSpot,
};
