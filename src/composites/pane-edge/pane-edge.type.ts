/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { PaneSize, PaneSizeHandle } from '../ResizeHandle/behavior/pane-size.type';
import type { HandleFold, ResizeHandleEdge, ResizeHandleProps } from '../ResizeHandle/ResizeHandle.type';
import type { SplitOrientation } from '../SplitPane/SplitPane.type';
import type { PaneFold } from './pane-fold.type';

interface EdgePane {
  fold: PaneFold;
  collapsible: boolean;
  id: string;
  label: string;
}

type EdgeHandle = PaneSizeHandle & Partial<Pick<ResizeHandleProps, 'pixelsPerUnit' | 'step' | 'largeStep'>> & {
  edge: ResizeHandleEdge;
  fold: HandleFold | undefined;
};

interface PaneEdgeShares {
  panes: RefObject<HTMLElement | null>;
  orientation: SplitOrientation;
}

interface PaneEdgeOptions {
  edge: ResizeHandleEdge;
  size: PaneSize;
  fold: PaneFold;
  other?: PaneFold;
  shares?: PaneEdgeShares;
}

interface PaneEdgeWiring {
  handle: EdgeHandle;
  other: PaneFold | undefined;
}

interface PaneEdgeProps {
  handle: EdgeHandle;
  start?: EdgePane;
  end?: EdgePane;
  orientation?: SplitOrientation;
  className?: string;
}

interface EdgeNames {
  both: (start: string, end: string) => string;
  one: (pane: string) => string;
}

export type { EdgeHandle, EdgeNames, EdgePane, PaneEdgeOptions, PaneEdgeProps, PaneEdgeWiring };
