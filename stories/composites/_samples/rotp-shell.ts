/* @layer stories @kind data */
import { createElement } from 'react';
import type { MenuGroup, SideNavConfig } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import type { IconName } from '../../../src/primitives';

type RotpScreen = { id: string; label: string; icon: IconName; blurb: string };

const ROTP_SCREENS: readonly RotpScreen[] = [
  { id: 'home', label: 'Home', icon: 'house', blurb: 'Your ROMs, profiles and studios at a glance.' },
  { id: 'profiles', label: 'Profiles', icon: 'users', blurb: 'Every profile, its saves and its seed.' },
  { id: 'roms', label: 'ROMs', icon: 'gamepad-2', blurb: 'Import a ROM and extract its assets.' },
  { id: 'sprites', label: 'Sprites', icon: 'image', blurb: 'Player sprites to pick from in a profile.' },
  { id: 'character', label: 'Character Studio', icon: 'user', blurb: 'Build a player sprite from parts and palettes.' },
  { id: 'language', label: 'Language Studio', icon: 'message-square', blurb: 'Edit the game text and the language packs.' },
  { id: 'msu', label: 'MSU Studio', icon: 'headphones', blurb: 'Check, measure and convert MSU packs.' },
];

const railItem = (id: string) => {
  const screen = ROTP_SCREENS.find((entry) => entry.id === id);
  return { id, label: screen?.label ?? id, icon: createElement(Icon, { name: screen?.icon ?? 'house' }) };
};

const ROTP_RAIL: SideNavConfig = {
  home: railItem('home'),
  groups: [
    { id: 'library', label: 'Library', items: ['profiles', 'roms', 'sprites'].map(railItem) },
    { id: 'studios', label: 'Studios', items: ['character', 'language', 'msu'].map(railItem) },
  ],
};

const rotpMenu = (go: (screen: string) => void): MenuGroup[] => [
  {
    id: 'play',
    items: [
      { id: 'home', icon: 'house', label: 'Home', onSelect: () => go('home') },
      { id: 'save-states', icon: 'save', label: 'Save States', description: 'While a game runs', disabled: true },
      { id: 'randomizer', icon: 'sparkles', label: 'Randomizer' },
      { id: 'search', icon: 'search', label: 'Search', shortcut: 'Ctrl+K' },
    ],
  },
  {
    id: 'screens',
    items: [
      {
        id: 'data',
        icon: 'layers',
        label: 'Data',
        children: ['home', 'profiles', 'roms', 'sprites', 'character', 'language', 'msu'].map((id) => {
          const screen = ROTP_SCREENS.find((entry) => entry.id === id);
          return { id: `data-${id}`, icon: screen?.icon ?? 'house', label: screen?.label ?? id, onSelect: () => go(id) };
        }),
      },
      {
        id: 'widgets',
        icon: 'layout-grid',
        label: 'Widgets',
        children: [
          { id: 'inventory', icon: 'package', label: 'Inventory Tracker', checked: true },
          { id: 'checks', icon: 'map', label: 'Checks Tracker', checked: true },
          { id: 'logs', icon: 'file-text', label: 'Logs', checked: false },
          { id: 'game-state', icon: 'radio', label: 'Game State', checked: false },
        ],
      },
      {
        id: 'advanced',
        icon: 'settings',
        label: 'Advanced',
        children: [
          { id: 'calibration', icon: 'gamepad-2', label: 'Input Calibration' },
          { id: 'inspector', icon: 'search', label: 'Data Inspector' },
        ],
      },
    ],
  },
  {
    id: 'app',
    items: [
      { id: 'credits', icon: 'star', label: 'Credits' },
      { id: 'about', icon: 'info', label: 'About' },
      { separator: true },
      { id: 'quit', icon: 'x', label: 'Quit', shortcut: 'Alt+F4' },
    ],
  },
];

export { ROTP_RAIL, ROTP_SCREENS, rotpMenu };
