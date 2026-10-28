/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { PaneFold } from '../../pane-edge/pane-fold.type';
import type { SplitOrientation, SplitPaneProps } from '../SplitPane.type';

interface SplitPaneSideProps extends Pick<SplitPaneProps, 'summary' | 'header'> {
  id: string;
  fold: PaneFold;
  label: string;
  side: 'start' | 'end';
  orientation: SplitOrientation;
  children: ReactNode;
}

export type { SplitPaneSideProps };
