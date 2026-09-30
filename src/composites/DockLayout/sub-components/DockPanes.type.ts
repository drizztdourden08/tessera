/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { PaneNode, Rect } from '../DockLayout.type';
import type { LaidOut } from '../behavior/layout-tree.type';

interface DockPanesProps {
  laid: LaidOut;
  renderPane: (pane: PaneNode, rect: Rect) => ReactNode;
}

export type { DockPanesProps };
