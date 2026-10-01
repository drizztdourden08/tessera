/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { buildColumnMenuItems } from '../behavior/column-menu-items';
import type { ColumnMenuProps } from './ColumnMenu.type';

const ColumnMenu = (props: ColumnMenuProps) => {
  const {
    path, index, columnCount, grouped, sortDir, grow, fit, fieldNodes,
    field, displayField, resolveTargetFields, actions, anchorRef, onStartRename, onClose,
  } = props;
  const { table } = useTesseraStrings();

  const items = buildColumnMenuItems({
    path, index, columnCount, grouped, sortDir, grow, fit, fieldNodes,
    field, displayField, resolveTargetFields, actions, onStartRename, onClose, strings: table,
  });

  return <DropdownMenu groups={[{ id: 'column', items }]} anchorRef={anchorRef} onClose={onClose} />;
};

export { ColumnMenu };
