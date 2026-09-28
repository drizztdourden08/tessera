/* @layer stories @kind data */
import { createElement } from 'react';
import type { MenuEntry } from '../../../src/composites/DropdownMenu';
import { Glyph } from '../../../src/primitives';
import type { GlyphName } from '../../../src/primitives';

type MenuState = {
  open: Record<string, boolean>;
  onToggle: (key: string) => void;
  onPick: (label: string) => void;
};

const glyph = (name: GlyphName) => createElement(Glyph, { name });

const WIDGETS = [
  { key: 'players', icon: glyph('box'), label: 'Players' },
  { key: 'log', icon: glyph('copy'), label: 'Server log' },
  { key: 'hints', icon: glyph('check'), label: 'Hints' },
  { key: 'console', icon: glyph('edit'), label: 'Console' },
];

const buildViewMenu = ({ open, onToggle, onPick }: MenuState): MenuEntry[] => [
  ...WIDGETS.map((widget) => ({ ...widget, checked: open[widget.key], onClick: () => onToggle(widget.key) })),
  'separator',
  {
    key: 'layout',
    icon: glyph('gear'),
    label: 'Layout',
    children: [
      { key: 'layout-default', label: 'Default dock', onClick: () => onPick('Default dock') },
      { key: 'layout-stream', label: 'Streaming', onClick: () => onPick('Streaming') },
      { key: 'layout-compact', label: 'Compact', onClick: () => onPick('Compact') },
    ],
  },
  { key: 'reset', icon: glyph('sortBoth'), label: 'Reset window positions', onClick: () => onPick('Reset window positions') },
  { key: 'spectate', icon: glyph('external'), label: 'Spectator view', disabled: true },
];

const INITIAL_OPEN: Record<string, boolean> = { players: true, log: true, hints: false, console: false };

export { INITIAL_OPEN, buildViewMenu };
