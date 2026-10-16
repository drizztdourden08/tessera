/* @layer renderer-components @kind types */
import type { PaneFoldOptions } from '../../pane-fold/pane-fold.type';
import type { PaneSizeOptions } from '../../ResizeHandle/behavior/pane-size.type';

interface SidePanelOptions {
  fold: PaneFoldOptions;
  width: PaneSizeOptions;
  resizable: boolean;
}

export type { SidePanelOptions };
