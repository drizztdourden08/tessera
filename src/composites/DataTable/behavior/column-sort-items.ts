/* @layer renderer-components @kind logic */
import { menuGlyph } from './menu-glyph';
import { SORT_DIR_ICON, SORT_DIR_LABEL } from './column-sort-items.constants';
import type { MenuEntry } from '../../DropdownMenu';
import type { SortEntry } from '../../../data/table/types';
import type { ColumnSortInput } from './column-sort-items.type';

const directionEntry = (input: ColumnSortInput, dir: SortEntry['dir']): MenuEntry => ({
  key: `sort-${dir}`,
  icon: menuGlyph(SORT_DIR_ICON[dir]),
  label: `Sort ${SORT_DIR_LABEL[dir]}`,
  onClick: input.act(() => input.actions.onSortDir(input.path, dir)),
});

const buildColumnSortItems = (input: ColumnSortInput): MenuEntry[] => {
  const { path, sortDir, actions, act } = input;

  if (!sortDir) return [directionEntry(input, 'asc'), directionEntry(input, 'desc')];

  return [
    directionEntry(input, sortDir === 'asc' ? 'desc' : 'asc'),
    {
      key: 'sort-remove',
      icon: '⌫',
      label: `Remove sort on this column (${SORT_DIR_LABEL[sortDir]})`,
      onClick: act(() => actions.onRemoveSort(path)),
    },
  ];
};

export { buildColumnSortItems };
