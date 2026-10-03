/* @layer stories @kind data */
import type { MenuGroup, MenuItem } from '../../../src/composites/DropdownMenu';

const EDIT_MENU: MenuGroup[] = [{
  id: 'edit',
  items: [
    { id: 'undo', icon: 'undo-2', label: 'Undo', shortcut: 'Ctrl+Z' },
    { id: 'redo', icon: 'redo-2', label: 'Redo', shortcut: 'Ctrl+Shift+Z' },
    { separator: true },
    { id: 'copy', icon: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
    { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
    { id: 'paste-plain', label: 'Paste as plain text', shortcut: 'Ctrl+Shift+V' },
    { separator: true },
    { id: 'delete', icon: 'trash-2', label: 'Delete', shortcut: 'Del' },
  ],
}];

const CATEGORY_MENU: MenuGroup[] = [
  { id: 'screens', label: 'Screens', items: [{ id: 'home', icon: 'house', label: 'Home' }, { id: 'tracker', icon: 'map', label: 'Tracker' }] },
  { id: 'tools', label: 'Tools', items: [{ id: 'logs', icon: 'file-text', label: 'Logs' }, { id: 'devtools', icon: 'bug', label: 'Developer tools' }] },
  { id: 'app', items: [{ id: 'settings', icon: 'settings', label: 'Settings' }, { separator: true }, { id: 'quit', icon: 'log-out', label: 'Quit' }] },
];

const SUBTITLE_MENU: MenuGroup[] = [{
  id: 'layouts',
  label: 'Layouts',
  items: [
    { id: 'dock', icon: 'layout-grid', label: 'Default dock', description: 'Widgets down both sides of the window', shortcut: 'Ctrl+1' },
    { id: 'stream', icon: 'monitor', label: 'Streaming', description: 'Room for the capture', shortcut: 'Ctrl+2' },
    { id: 'compact', icon: 'list', label: 'Compact', shortcut: 'Ctrl+3' },
  ],
}];

const PRESETS: readonly MenuItem[] = [
  { id: 'preset-casual', label: 'Casual', description: 'Hints on, no timer' },
  { id: 'preset-race', label: 'Race', description: 'Timer and spoiler log' },
  { id: 'preset-custom', label: 'Custom' },
];

const NESTED_MENU: MenuGroup[] = [
  {
    id: 'file',
    items: [
      {
        id: 'new',
        icon: 'plus',
        label: 'New',
        children: [
          { id: 'new-profile', icon: 'users', label: 'Profile', shortcut: 'Ctrl+N' },
          { id: 'new-session', icon: 'monitor', label: 'Session' },
          { id: 'new-preset', icon: 'star', label: 'Preset', children: PRESETS },
        ],
      },
      { id: 'open', icon: 'folder-open', label: 'Open', shortcut: 'Ctrl+O' },
      {
        id: 'export',
        icon: 'share-2',
        label: 'Export',
        children: [
          { id: 'export-json', icon: 'file-text', label: 'JSON file' },
          { id: 'export-csv', icon: 'list', label: 'CSV table' },
          { separator: true },
          { id: 'export-copy', icon: 'copy', label: 'Copy to clipboard', shortcut: 'Ctrl+Shift+C' },
        ],
      },
    ],
  },
  {
    id: 'view',
    label: 'View',
    items: [
      { id: 'zoom', icon: 'search', label: 'Zoom', children: [{ id: 'zoom-in', label: 'Bigger', shortcut: 'Ctrl+Plus' }, { id: 'zoom-out', label: 'Smaller', shortcut: 'Ctrl+Minus' }] },
      {
        id: 'theme',
        icon: 'sun',
        label: 'Theme',
        children: [
          { id: 'theme-light', icon: 'sun', label: 'Light', kind: 'radio', checked: false },
          { id: 'theme-dark', icon: 'moon', label: 'Dark', kind: 'radio', checked: true },
          { id: 'theme-system', icon: 'monitor', label: 'Same as the system', kind: 'radio', checked: false },
          { separator: true },
          { id: 'theme-motion', label: 'Reduce motion', checked: false },
          { id: 'theme-contrast', label: 'High contrast', checked: true },
        ],
      },
    ],
  },
];

export { CATEGORY_MENU, EDIT_MENU, NESTED_MENU, SUBTITLE_MENU };
