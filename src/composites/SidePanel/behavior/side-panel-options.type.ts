/* @layer renderer-components @kind types */
import type { PaneFoldOptions } from '../../pane-edge/pane-fold.type';
import type { PaneSizeOptions } from '../../ResizeHandle/behavior/pane-size.type';

interface SidePanelOptions {
  fold: PaneFoldOptions;
  width: PaneSizeOptions;
}

export type { SidePanelOptions };
