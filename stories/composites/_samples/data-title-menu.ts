/* @layer stories @kind data */
import type { MenuGroup } from '../../../src/composites/DropdownMenu';

const buildTitleMenu = (onPick: (label: string) => void, withUpdates = true): MenuGroup[] => {
  const pick = (label: string) => () => onPick(label);
  return [
    {
      id: 'screens',
      label: 'Screens',
      items: [
        { id: 'home', icon: 'house', label: 'Home', shortcut: 'Ctrl+H', onSelect: pick('Home') },
        { id: 'library', icon: 'folder-open', label: 'Library', onSelect: pick('Library') },
        { id: 'tracker', icon: 'map', label: 'Tracker', description: 'Items, checks and the map', onSelect: pick('Tracker') },
      ],
    },
    {
      id: 'tools',
      items: [
        {
          id: 'tools',
          icon: 'puzzle',
          label: 'Tools',
          children: [
            { id: 'logs', icon: 'file-text', label: 'Logs', onSelect: pick('Logs') },
            { id: 'devtools', icon: 'bug', label: 'Developer tools', shortcut: 'Ctrl+Shift+I', onSelect: pick('Developer tools') },
            { separator: true },
            { id: 'reload', icon: 'refresh-cw', label: 'Reload', shortcut: 'Ctrl+R', onSelect: pick('Reload') },
          ],
        },
        { id: 'settings', icon: 'settings', label: 'Settings', shortcut: 'Ctrl+,', onSelect: pick('Settings') },
      ],
    },
    {
      id: 'app',
      items: [
        ...(withUpdates ? [{ id: 'updates', icon: 'download', label: 'Check for updates', onSelect: pick('Check for updates') } as const] : []),
        { id: 'about', icon: 'info', label: 'About', onSelect: pick('About') },
        { separator: true },
        { id: 'quit', icon: 'log-out', label: 'Quit', shortcut: 'Ctrl+Q', onSelect: pick('Quit') },
      ],
    },
  ];
};

export { buildTitleMenu };
