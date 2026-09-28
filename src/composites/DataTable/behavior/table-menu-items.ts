/* @layer renderer-components @kind logic */
import { buildFieldMenuItems } from './field-menu-items';
import { menuGlyph } from './menu-glyph';
import type { MenuEntry } from '../../DropdownMenu';
import type { TableMenuInput } from './table-menu-items.type';

const buildTableMenuItems = (input: TableMenuInput): MenuEntry[] => {
  const { sortActive, groupActive, fieldNodes = [], actions, onClose } = input;
  const act = (run: () => void) => () => {
    onClose();
    run();
  };

  return [
    {
      key: 'add-column',
      icon: menuGlyph('plus'),
      label: 'Add column',
      children: buildFieldMenuItems({
        nodes: fieldNodes,
        onPick: (field: string) => act(() => actions.onAddColumn(field))(),
      }),
    },
    'separator',
    {
      key: 'clear-sort',
      icon: '⌫',
      label: 'Clear all sorting',
      disabled: !sortActive,
      onClick: act(actions.onClearSort),
    },
    {
      key: 'clear-group',
      icon: '⌫',
      label: 'Clear all grouping',
      disabled: !groupActive,
      onClick: act(actions.onClearGroupBy),
    },
    'separator',
    {
      key: 'fit-all',
      icon: menuGlyph('widen'),
      label: 'Fit all to content',
      onClick: act(actions.onFitAllToContent),
    },
    { key: 'reset', icon: '↺', label: 'Reset columns to defaults', onClick: act(actions.onResetColumns) },
  ];
};

export { buildTableMenuItems };
