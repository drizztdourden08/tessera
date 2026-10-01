/* @layer stories @kind data */
import type { MenuGroup, MenuItem } from '../../../src/composites/DropdownMenu';

type MenuState = {
  open: Record<string, boolean>;
  onToggle: (id: string) => void;
  onPick: (label: string) => void;
};

const WIDGETS: readonly MenuItem[] = [
  { id: 'players', icon: 'users', label: 'Players', shortcut: 'Ctrl+1' },
  { id: 'log', icon: 'file-text', label: 'Server log', shortcut: 'Ctrl+2' },
  { id: 'hints', icon: 'sparkles', label: 'Hints' },
  { id: 'console', icon: 'keyboard', label: 'Console', shortcut: ['ctrl', 'shift', 'C'] },
];

const LAYOUTS = (onPick: (label: string) => void): MenuItem => ({
  id: 'layout',
  icon: 'layout-grid',
  label: 'Layout',
  children: [
    { id: 'layout-default', label: 'Default dock', description: 'Widgets down both sides', onSelect: () => onPick('Default dock') },
    { id: 'layout-stream', label: 'Streaming', description: 'Room for the capture', onSelect: () => onPick('Streaming') },
    { id: 'layout-compact', label: 'Compact', onSelect: () => onPick('Compact') },
    { separator: true },
    { id: 'layout-save', icon: 'save', label: 'Save this layout', shortcut: 'Ctrl+Shift+S', onSelect: () => onPick('Save this layout') },
  ],
});

const buildViewMenu = ({ open, onToggle, onPick }: MenuState): MenuGroup[] => [
  {
    id: 'widgets',
    label: 'Widgets',
    items: WIDGETS.map((widget) => ({ ...widget, checked: open[widget.id] === true, onSelect: () => onToggle(widget.id) })),
  },
  {
    id: 'window',
    label: 'Window',
    items: [
      LAYOUTS(onPick),
      { id: 'reset', icon: 'rotate-ccw', label: 'Reset window positions', shortcut: 'Ctrl+0', onSelect: () => onPick('Reset window positions') },
      { id: 'spectate', icon: 'monitor', label: 'Spectator view', description: 'Needs a second screen', disabled: true },
    ],
  },
];

const INITIAL_OPEN: Record<string, boolean> = { players: true, log: true, hints: false, console: false };

export { INITIAL_OPEN, buildViewMenu };
