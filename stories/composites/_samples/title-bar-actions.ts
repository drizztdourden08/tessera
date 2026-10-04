/* @layer stories @kind data */
import type { WindowTitleBarAction } from '../../../src/composites';

const titleBarActions = (onPick: (label: string) => void, update: string | null = 'Update available'): WindowTitleBarAction[] => [
  { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', onSelect: () => onPick('Report a bug') },
  {
    id: 'updates',
    icon: 'download',
    label: 'Check for updates',
    bar: 'status',
    status: update ?? undefined,
    tone: 'success',
    onSelect: () => onPick('Check for updates'),
  },
];

export { titleBarActions };
