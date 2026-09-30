/* @layer renderer-components @kind logic */
import { buildColumnDisplayItems } from './column-display-items';
import { buildColumnSortItems } from './column-sort-items';
import { buildFieldMenuItems } from './field-menu-items';
import { menuGlyph } from './menu-glyph';
import { menuIcon } from './menu-icon';
import type { MenuEntry } from '../../DropdownMenu';
import type { ColumnMenuInput } from './column-menu-items.type';

const buildColumnMenuItems = (input: ColumnMenuInput): MenuEntry[] => {
  const {
    path, index, columnCount, grouped, sortDir, grow, fit, fieldNodes = [],
    displayField, resolveTargetFields, actions, onStartRename, onClose,
  } = input;
  const columnField = input.field;
  const isFirst = index <= 0;
  const isLast = index >= columnCount - 1;
  const act = (run: () => void) => () => {
    onClose();
    run();
  };

  const addAt = (at: number) => buildFieldMenuItems({
    nodes: fieldNodes,
    onPick: (field: string) => act(() => actions.onAddColumnAt(field, at))(),
  });

  return [
    { key: 'add-before', icon: menuGlyph('plus'), label: 'Add column before', children: addAt(index) },
    { key: 'add-after', icon: menuGlyph('plus'), label: 'Add column after', children: addAt(index + 1) },
    'separator',
    { key: 'remove', icon: menuGlyph('close'), label: 'Remove column', onClick: act(() => actions.onRemove(path)) },
    { key: 'rename', icon: menuGlyph('edit'), label: 'Rename...', onClick: act(onStartRename) },
    ...buildColumnDisplayItems({
      path, field: columnField, displayField, resolveTargetFields, actions, act,
    }),
    'separator',
    { key: 'move-left', icon: menuGlyph('chevronLeft'), label: 'Move left', disabled: isFirst, onClick: act(() => actions.onMove(path, 'left')) },
    { key: 'move-right', icon: menuGlyph('chevronRight'), label: 'Move right', disabled: isLast, onClick: act(() => actions.onMove(path, 'right')) },
    { key: 'move-first', icon: menuIcon('arrow-left-to-line'), label: 'Move to first', disabled: isFirst, onClick: act(() => actions.onMove(path, 'first')) },
    { key: 'move-last', icon: menuIcon('arrow-right-to-line'), label: 'Move to last', disabled: isLast, onClick: act(() => actions.onMove(path, 'last')) },
    'separator',
    grouped
      ? { key: 'ungroup', icon: menuIcon('ungroup'), label: 'Ungroup this column', onClick: act(() => actions.onUngroup(path)) }
      : { key: 'group', icon: menuIcon('group'), label: 'Group by this column', onClick: act(() => actions.onGroupBy(path)) },
    ...buildColumnSortItems({ path, sortDir, actions, act }),
    'separator',
    {
      key: 'fit',
      icon: menuGlyph('widen'),
      label: 'Fit to content',
      disabled: fit === true,
      onClick: act(() => actions.onFitToContent(path)),
    },
    {
      key: 'expand',
      icon: menuIcon('maximize-2'),
      label: 'Expand to available space',
      disabled: grow === true,
      onClick: act(() => actions.onExpandToFill(path)),
    },
  ];
};

export { buildColumnMenuItems };
