/* @layer renderer-components @kind data */
import type { IconName } from '../../../../primitives/Icon';
import type { SegmentOption } from '../../../../primitives/SegmentedControl/SegmentedControl.type';
import type { PinMode, WidgetVisibility } from '../../Widget.type';
import type { PlacementButton, ShortcutEntry } from './WidgetOptions.type';

const PLACEMENT_BUTTONS: readonly PlacementButton[] = [
  { edge: 'left', label: 'Dock left' },
  { edge: 'right', label: 'Dock right' },
  { edge: 'top', label: 'Dock top' },
  { edge: 'bottom', label: 'Dock bottom' },
  { edge: null, label: 'Float' },
];

const PLACEMENT_ICONS: Record<'left' | 'right' | 'top' | 'bottom' | 'float', IconName> = {
  left: 'panel-left', right: 'panel-right', top: 'panel-top', bottom: 'panel-bottom', float: 'picture-in-picture-2',
};

const PIN_OPTIONS: SegmentOption<PinMode>[] = [
  { value: 'off', label: 'Off', title: 'Behaves like any window' },
  { value: 'top', label: 'On top', title: 'Always over every other window' },
  { value: 'with-app', label: 'With app', title: 'On top exactly when the app is, and comes forward with it' },
];

const SHOW_ALWAYS: SegmentOption<WidgetVisibility> = { value: 'always', label: 'Always' };

const DEFAULT_CONTEXT_LABEL = 'In context';

const OPACITY_MIN = 0;

const OPACITY_MAX = 100;

const OPACITY_STEP = 5;

const PANEL_WIDTH = 272;

const PANEL_HEIGHT = 470;

const EDGE_MARGIN = 8;

const ANCHOR_GAP = 4;

const ORIGIN = { top: 0, left: 0 };

const DEFAULT_MAKE_ROOM_HINT = 'The main view shrinks to fit this widget';

const SHORTCUTS: readonly ShortcutEntry[] = [
  { gesture: 'Drag title', does: 'Move to a dock edge, a pane, a tab or over the main view' },
  { keys: 'alt', gesture: '', does: 'Peek: widgets fold away while held' },
  { keys: 'shift', gesture: '+ drop', does: 'Swap with the pane under the pointer' },
  { keys: 'ctrl', gesture: '+ drop', does: 'Land as an overlay, the main view keeps its room' },
  { keys: 'esc', gesture: '', does: 'Cancel the drag' },
  { gesture: 'Drag past the edge', does: 'Pop out into its own window' },
  { gesture: 'Drag the gap', does: 'Resize neighbours; double-click evens them' },
];

export {
  ANCHOR_GAP, DEFAULT_CONTEXT_LABEL, DEFAULT_MAKE_ROOM_HINT, EDGE_MARGIN, OPACITY_MAX, OPACITY_MIN, OPACITY_STEP, ORIGIN, PANEL_HEIGHT,
  PANEL_WIDTH, PIN_OPTIONS, PLACEMENT_BUTTONS, PLACEMENT_ICONS, SHORTCUTS, SHOW_ALWAYS,
};
