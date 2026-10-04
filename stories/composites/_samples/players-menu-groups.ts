/* @layer stories @kind logic */
import type { MenuGroup } from '../../../src/composites';
import type { PlayersView } from './data-widget-panels';

type PlayersSort = Required<PlayersView>['sort'];

const SORTS: readonly { value: PlayersSort; label: string; description: string }[] = [
  { value: 'name', label: 'Name', description: 'Players in alphabetical order' },
  { value: 'progress', label: 'Progress', description: 'Players closest to their goal first' },
];

const playersMenuGroups = (view: Required<PlayersView>, onChange: (patch: PlayersView) => void): MenuGroup[] => [{
  id: 'players',
  label: 'Players',
  items: [
    {
      id: 'sort',
      label: 'Sort',
      icon: 'arrow-up-down',
      description: SORTS.find((sort) => sort.value === view.sort)?.label,
      children: SORTS.map((sort) => ({
        id: `sort:${sort.value}`, label: sort.label, description: sort.description, kind: 'radio' as const,
        checked: view.sort === sort.value, onSelect: () => onChange({ sort: sort.value }),
      })),
    },
    {
      id: 'compact', label: 'Compact rows', description: 'One line per player: the game and the progress bar go', kind: 'check',
      checked: view.compact, onSelect: () => onChange({ compact: !view.compact }),
    },
    {
      id: 'finished', label: 'Finished players', description: 'Keep players who reached their goal in the list', kind: 'check',
      checked: view.finished, onSelect: () => onChange({ finished: !view.finished }),
    },
  ],
}];

export { playersMenuGroups };
