/* @layer renderer-components @kind data */
import type { PinMode, WidgetVisibility } from '../../Widget.type';
import type { IconChoice, PlacementChoice, RoomChoice, ShortcutGroupEntry, SnapChoice } from './WidgetOptions.type';

const WIDGET_OPTIONS_ATTRIBUTE = 'data-widget-options';

const WIDGET_OPTIONS_DATA = { [WIDGET_OPTIONS_ATTRIBUTE]: '' } as const;

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
];

const SNAP_CHOICES: readonly IconChoice<SnapChoice>[] = [
  { value: 'free', icon: 'move', label: 'snapOff', hint: 'snapOffHint' },
  { value: 'snap', icon: 'magnet', label: 'snapOn', hint: 'snapOnHint' },
];

const OPACITY_MIN = 0;

const OPACITY_MAX = 100;

const OPACITY_STEP = 5;

const SHORTCUT_GROUPS: readonly ShortcutGroupEntry[] = [
  {
    label: 'shortcutsAnyTime',
    items: [
      { gesture: { icon: 'move', label: 'shortcutDragTitle' }, does: 'shortcutDragTitleDoes' },
      { keys: 'alt', does: 'shortcutPeekDoes' },
      { gesture: { icon: 'arrow-left-right', label: 'shortcutDragGap' }, does: 'shortcutResizeDoes' },
    ],
  },
  {
    label: 'shortcutsWhileDragging',
    items: [
      { keys: 'shift', does: 'shortcutSwapDoes' },
      { keys: 'ctrl', does: 'shortcutOverlayDoes' },
      { keys: 'esc', does: 'shortcutCancelDoes' },
      { gesture: { icon: 'external-link', label: 'shortcutDragPastEdge' }, does: 'shortcutPopOutDoes' },
    ],
  },
];

export {
  OPACITY_MAX, OPACITY_MIN, OPACITY_STEP, PIN_CHOICES, PLACEMENT_CHOICES, ROOM_CHOICES, SHORTCUT_GROUPS, SHOW_CHOICES, SNAP_CHOICES,
  WIDGET_OPTIONS_ATTRIBUTE, WIDGET_OPTIONS_DATA,
};
