/* @layer renderer-components @kind logic */
import { buildFieldMenuItems } from './field-menu-items';
import { menuGlyph } from './menu-glyph';
import { menuIcon } from './menu-icon';
import type { MenuNode } from '../../DropdownMenu';
import type { TableMenuInput } from './table-menu-items.type';

const buildTableMenuItems = (input: TableMenuInput): MenuNode[] => {
  const { sortActive, groupActive, fieldNodes = [], actions, onClose, strings } = input;
  const act = (run: () => void) => () => {
    onClose();
    run();
  };

  return [
    {
      id: 'add-column',
      icon: menuGlyph('plus'),
      label: strings.addColumn,
      children: buildFieldMenuItems({
        nodes: fieldNodes,
        strings,
        onPick: (field: string) => act(() => actions.onAddColumn(field))(),
      }),
    },
    { separator: true },
    {
      id: 'clear-sort',
      icon: menuIcon('delete'),
      label: strings.clearSorting,
      disabled: !sortActive,
      onSelect: act(actions.onClearSort),
    },
    {
      id: 'clear-group',
      icon: menuIcon('delete'),
      label: strings.clearGrouping,
      disabled: !groupActive,
      onSelect: act(actions.onClearGroupBy),
    },
    { separator: true },
    {
      id: 'fit-all',
      icon: menuGlyph('widen'),
      label: strings.fitAllToContent,
      onSelect: act(actions.onFitAllToContent),
    },
    { id: 'reset', icon: menuIcon('rotate-ccw'), label: strings.resetColumns, onSelect: act(actions.onResetColumns) },
  ];
};

export { buildTableMenuItems };
