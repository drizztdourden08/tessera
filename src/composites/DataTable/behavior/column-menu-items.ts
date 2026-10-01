/* @layer renderer-components @kind logic */
import { buildColumnDisplayItems } from './column-display-items';
import { buildColumnSortItems } from './column-sort-items';
import { buildFieldMenuItems } from './field-menu-items';
import { menuGlyph } from './menu-glyph';
import { menuIcon } from './menu-icon';
import type { MenuNode } from '../../DropdownMenu';
import type { ColumnMenuInput } from './column-menu-items.type';

const buildColumnMenuItems = (input: ColumnMenuInput): MenuNode[] => {
  const {
    path, index, columnCount, grouped, sortDir, grow, fit, fieldNodes = [],
    displayField, resolveTargetFields, actions, onStartRename, onClose, strings,
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
    strings,
    onPick: (field: string) => act(() => actions.onAddColumnAt(field, at))(),
  });

  return [
    { id: 'add-before', icon: menuGlyph('plus'), label: strings.addColumnBefore, children: addAt(index) },
    { id: 'add-after', icon: menuGlyph('plus'), label: strings.addColumnAfter, children: addAt(index + 1) },
    { separator: true },
    { id: 'remove', icon: menuGlyph('close'), label: strings.removeColumn, onSelect: act(() => actions.onRemove(path)) },
    { id: 'rename', icon: menuGlyph('edit'), label: strings.rename, onSelect: act(onStartRename) },
    ...buildColumnDisplayItems({
      path, field: columnField, displayField, resolveTargetFields, actions, act, strings,
    }),
    { separator: true },
    { id: 'move-left', icon: menuGlyph('chevronLeft'), label: strings.moveLeft, disabled: isFirst, onSelect: act(() => actions.onMove(path, 'left')) },
    { id: 'move-right', icon: menuGlyph('chevronRight'), label: strings.moveRight, disabled: isLast, onSelect: act(() => actions.onMove(path, 'right')) },
    { id: 'move-first', icon: menuIcon('arrow-left-to-line'), label: strings.moveToFirst, disabled: isFirst, onSelect: act(() => actions.onMove(path, 'first')) },
    { id: 'move-last', icon: menuIcon('arrow-right-to-line'), label: strings.moveToLast, disabled: isLast, onSelect: act(() => actions.onMove(path, 'last')) },
    { separator: true },
    grouped
      ? { id: 'ungroup', icon: menuIcon('ungroup'), label: strings.ungroupColumn, onSelect: act(() => actions.onUngroup(path)) }
      : { id: 'group', icon: menuIcon('group'), label: strings.groupByColumn, onSelect: act(() => actions.onGroupBy(path)) },
    ...buildColumnSortItems({ path, sortDir, actions, act, strings }),
    { separator: true },
    {
      id: 'fit',
      icon: menuGlyph('widen'),
      label: strings.fitToContent,
      disabled: fit === true,
      onSelect: act(() => actions.onFitToContent(path)),
    },
    {
      id: 'expand',
      icon: menuIcon('maximize-2'),
      label: strings.expandToSpace,
      disabled: grow === true,
      onSelect: act(() => actions.onExpandToFill(path)),
    },
  ];
};

export { buildColumnMenuItems };
