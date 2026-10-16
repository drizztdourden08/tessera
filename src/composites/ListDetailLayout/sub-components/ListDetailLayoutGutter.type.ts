/* @layer renderer-components @kind types */
import type { ListHandle } from '../behavior/useListDetailPanes.type';
import type { PaneFold } from '../../pane-fold/pane-fold.type';

interface GutterPane {
  fold: PaneFold;
  collapsible: boolean;
  id: string;
  label: string;
}

interface ListDetailLayoutGutterProps {
  list: GutterPane;
  detail: GutterPane;
  resizable: boolean;
  handle: ListHandle;
}

export type { GutterPane, ListDetailLayoutGutterProps };
