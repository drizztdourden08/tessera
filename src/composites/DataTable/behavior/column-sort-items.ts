/* @layer renderer-components @kind logic */
import { menuIcon } from './menu-icon';
import { directionWord } from './direction-word';
import { SORT_DIR_ICON } from './column-sort-items.constants';
import type { MenuNode } from '../../DropdownMenu';
import type { SortEntry } from '../../../data/table/types';
import type { ColumnSortInput } from './column-sort-items.type';

const directionEntry = (input: ColumnSortInput, dir: SortEntry['dir']): MenuNode => ({
  id: `sort-${dir}`,
  icon: menuIcon(SORT_DIR_ICON[dir]),
  label: dir === 'asc' ? input.strings.sortAscending : input.strings.sortDescending,
  onSelect: input.act(() => input.actions.onSortDir(input.path, dir)),
});

const buildColumnSortItems = (input: ColumnSortInput): MenuNode[] => {
  const { path, sortDir, actions, act, strings } = input;

  if (!sortDir) return [directionEntry(input, 'asc'), directionEntry(input, 'desc')];

  return [
    directionEntry(input, sortDir === 'asc' ? 'desc' : 'asc'),
    {
      id: 'sort-remove',
      icon: menuIcon('delete'),
      label: strings.removeColumnSort(directionWord(sortDir, strings)),
      onSelect: act(() => actions.onRemoveSort(path)),
    },
  ];
};

export { buildColumnSortItems };
