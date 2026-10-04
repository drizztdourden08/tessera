/* @layer renderer-components @kind data */
import type { PinMode, WidgetVisibility } from '../../Widget.type';
import type { IconChoice, PlacementChoice, RoomChoice, ShortcutEntry, SnapChoice } from './WidgetOptions.type';

const PLACEMENT_CHOICES: readonly IconChoice<PlacementChoice>[] = [
  { value: 'left', icon: 'panel-left', label: 'dockLeft', hint: 'dockLeftHint' },
  { value: 'right', icon: 'panel-right', label: 'dockRight', hint: 'dockRightHint' },
  { value: 'top', icon: 'panel-top', label: 'dockTop', hint: 'dockTopHint' },
  { value: 'bottom', icon: 'panel-bottom', label: 'dockBottom', hint: 'dockBottomHint' },
  { value: 'float', icon: 'picture-in-picture-2', label: 'float', hint: 'floatHint' },
  { value: 'window', icon: 'app-window', label: 'ownWindow', hint: 'ownWindowHint' },
];

const ROOM_CHOICES: readonly IconChoice<RoomChoice>[] = [
  { value: 'room', icon: 'columns-3', label: 'makeRoom', hint: 'makeRoomHint' },
  { value: 'overlay', icon: 'layers', label: 'overlay', hint: 'overlayHint' },
];

const SHOW_CHOICES: readonly IconChoice<WidgetVisibility>[] = [
  { value: 'always', icon: 'eye', label: 'showAlways', hint: 'showAlwaysHint' },
  { value: 'context-only', icon: 'play', label: 'contextLabel', hint: 'contextHint' },
];

const PIN_CHOICES: readonly IconChoice<PinMode>[] = [
  { value: 'off', icon: 'pin-off', label: 'pinOff', hint: 'pinOffHint' },
  { value: 'top', icon: 'pin', label: 'pinOnTop', hint: 'pinOnTopHint' },
  { value: 'with-app', icon: 'link', label: 'pinWithApp', hint: 'pinWithAppHint' },
];

const SNAP_CHOICES: readonly IconChoice<SnapChoice>[] = [
  { value: 'free', icon: 'move', label: 'snapOff', hint: 'snapOffHint' },
  { value: 'snap', icon: 'magnet', label: 'snapOn', hint: 'snapOnHint' },
];

const NO_GROUP = 'tessera:no-group';

const ABOUT_ICON_SIZE = 12;

const NUMBERED_GROUPS = 4;

const OPACITY_MIN = 0;

const OPACITY_MAX = 100;

const OPACITY_STEP = 5;

const PANEL_WIDTH = 256;

const PANEL_HEIGHT = 280;

const ASIDE_WIDTH = 256;

const EDGE_MARGIN = 8;

const ANCHOR_GAP = 4;

const ORIGIN = { top: 0, left: 0 };

const SHORTCUTS_OPEN_KEY = 'tessera:widget-options-shortcuts';

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
  ABOUT_ICON_SIZE, ANCHOR_GAP, ASIDE_WIDTH, EDGE_MARGIN, NO_GROUP, NUMBERED_GROUPS, OPACITY_MAX, OPACITY_MIN, OPACITY_STEP, ORIGIN, PANEL_HEIGHT, PANEL_WIDTH, PIN_CHOICES,
  PLACEMENT_CHOICES, ROOM_CHOICES, SHORTCUTS, SHORTCUTS_OPEN_KEY, SHOW_CHOICES, SNAP_CHOICES,
};
