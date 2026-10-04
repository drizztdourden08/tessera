/* @layer stories @kind data */
import type { WindowTitleBarAction } from '../../../src/composites';

const titleBarActions = (onPick: (label: string) => void, update: string | null = 'Update available', pulse = false): WindowTitleBarAction[] => [
  { id: 'search', icon: 'search', label: 'Search', shortcut: 'Ctrl+K', onSelect: () => onPick('Search') },
  { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', onSelect: () => onPick('Report a bug') },
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

export { titleBarActions };
