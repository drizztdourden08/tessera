/* @layer stories @kind data */
import type { WindowTitleBarAction } from '../../../src/composites';
import type { TitleBarGroupState } from './title-bar-group.type';

const GROUPS = [0, 1, 2, 3, 4] as const;

const groupActions = (state: TitleBarGroupState): WindowTitleBarAction[] => [
  {
    id: 'window-group',
    icon: 'group',
    label: 'Window group',
    bar: 'dropdown',
    groups: [
      {
        id: 'group',
        label: 'Group',
        items: GROUPS.map((group) => ({
          id: `group-${group}`,
          kind: 'radio',
          label: group === 0 ? 'No group' : `Group ${group}`,
          checked: state.group === group,
          onSelect: () => state.onGroup(group),
        })),
      },
      { id: 'sync', items: [{ id: 'sync', kind: 'check', label: 'Sync with main window', checked: state.sync, onSelect: state.onSync }] },
    ],
  },
  { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', onSelect: state.onBug },
  {
    id: 'saves',
    icon: 'refresh-cw',
    label: 'Cloud saves',
    bar: 'status',
    status: state.syncing ? 'Syncing saves' : undefined,
    tone: 'info',
    pulse: true,
    onSelect: state.onSaves,
  },
];

export { groupActions };
