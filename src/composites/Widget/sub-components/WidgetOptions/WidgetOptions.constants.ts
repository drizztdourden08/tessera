/* @layer renderer-components @kind data */
import type { IconName } from '../../../../primitives/Icon';
import type { PlacementButton, ShortcutEntry } from './WidgetOptions.type';

const PLACEMENT_BUTTONS: readonly PlacementButton[] = [
  { edge: 'left', labelKey: 'dockLeft' },
  { edge: 'right', labelKey: 'dockRight' },
  { edge: 'top', labelKey: 'dockTop' },
  { edge: 'bottom', labelKey: 'dockBottom' },
  { edge: null, labelKey: 'float' },
];

const PLACEMENT_ICONS: Record<'left' | 'right' | 'top' | 'bottom' | 'float', IconName> = {
  left: 'panel-left', right: 'panel-right', top: 'panel-top', bottom: 'panel-bottom', float: 'picture-in-picture-2',
};

const OPACITY_MIN = 0;

const OPACITY_MAX = 100;

const OPACITY_STEP = 5;

const PANEL_WIDTH = 272;

const PANEL_HEIGHT = 470;

const EDGE_MARGIN = 8;

const ANCHOR_GAP = 4;

const ORIGIN = { top: 0, left: 0 };

const SHORTCUTS: readonly ShortcutEntry[] = [
  { gesture: 'shortcutDragTitle', does: 'shortcutDragTitleDoes' },
  { keys: 'alt', does: 'shortcutPeekDoes' },
  { keys: 'shift', gesture: 'shortcutPlusDrop', does: 'shortcutSwapDoes' },
  { keys: 'ctrl', gesture: 'shortcutPlusDrop', does: 'shortcutOverlayDoes' },
  { keys: 'esc', does: 'shortcutCancelDoes' },
  { gesture: 'shortcutDragPastEdge', does: 'shortcutPopOutDoes' },
  { gesture: 'shortcutDragGap', does: 'shortcutResizeDoes' },
];

export {
  ANCHOR_GAP, EDGE_MARGIN, OPACITY_MAX, OPACITY_MIN, OPACITY_STEP, ORIGIN, PANEL_HEIGHT, PANEL_WIDTH, PLACEMENT_BUTTONS, PLACEMENT_ICONS,
  SHORTCUTS,
};
