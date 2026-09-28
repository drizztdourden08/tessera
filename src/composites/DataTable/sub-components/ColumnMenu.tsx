/* @layer renderer-components @kind component */
import { DropdownMenu } from '../../DropdownMenu';
import { buildColumnMenuItems } from '../behavior/column-menu-items';
import type { ColumnMenuProps } from './ColumnMenu.type';

const ColumnMenu = (props: ColumnMenuProps) => {
  const {
    path, index, columnCount, grouped, sortDir, grow, fit, fieldNodes,
    field, displayField, resolveTargetFields, actions, anchorRef, onStartRename, onClose,
  } = props;

  const items = buildColumnMenuItems({
    path, index, columnCount, grouped, sortDir, grow, fit, fieldNodes,
    field, displayField, resolveTargetFields, actions, onStartRename, onClose,
  });

  return <DropdownMenu items={items} anchorRef={anchorRef} />;
};

export { ColumnMenu };
