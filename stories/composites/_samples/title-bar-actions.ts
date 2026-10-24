/* @layer stories @kind data */
import type { WindowTitleBarAction } from '../../../src/composites';

const titleBarActions = (onPick: (label: string) => void, update: string | null = 'Update available', pulse = false): WindowTitleBarAction[] => [
  { id: 'search', icon: 'search', label: 'Search', shortcut: 'Ctrl+K', tone: 'primary', effect: 'twinkle', onSelect: () => onPick('Search') },
  { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', effect: 'ping', onSelect: () => onPick('Report a bug') },
  {
    id: 'updates',
    icon: 'download',
    label: 'Check for updates',
    bar: 'status',
    status: update ?? undefined,
    tone: 'success',
    pulse,
    onSelect: () => onPick('Check for updates'),
  },
];

const historyActions = (onPick: (label: string) => void): WindowTitleBarAction[] => [
  { id: 'undo', icon: 'arrow-left', label: 'Undo', shortcut: 'Ctrl+Z', disabled: true, disabledReason: 'Nothing to undo', onSelect: () => onPick('Undo') },
  { id: 'redo', icon: 'arrow-right', label: 'Redo', shortcut: 'Ctrl+Y', disabled: true, onSelect: () => onPick('Redo') },
  { id: 'search', icon: 'search', label: 'Search', shortcut: 'Ctrl+K', onSelect: () => onPick('Search') },
];

export { historyActions, titleBarActions };
