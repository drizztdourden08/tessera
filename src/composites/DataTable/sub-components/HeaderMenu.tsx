/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ColumnMenu } from './ColumnMenu';
import type { HeaderMenuProps } from './HeaderMenu.type';

const HeaderMenu = (props: HeaderMenuProps) => {
  const {
    menu, label, column, field, index, columnCount, sortDir, grouped,
    fieldNodes, resolveTargetFields, actions, onStartRename,
  } = props;
  const { table } = useTesseraStrings();

  return (
    <>
      <Pressable
        ref={menu.anchorRef}
        className="data-table__menu-trigger"
        aria-label={table.columnOptionsNamed(label)}
        aria-haspopup="menu"
        aria-expanded={menu.open}
        onClick={menu.toggle}
      >
        <Icon name="ellipsis" />
      </Pressable>
      {menu.open && (
        <ColumnMenu
          path={column.path}
          index={index}
          columnCount={columnCount}
          grouped={grouped}
          sortDir={sortDir}
          grow={column.grow}
          fit={column.fit}
          fieldNodes={fieldNodes}
          field={field}
          displayField={column.displayField}
          resolveTargetFields={resolveTargetFields}
          actions={actions}
          anchorRef={menu.anchorRef}
          onStartRename={onStartRename}
          onClose={menu.close}
        />
      )}
    </>
  );
};

export { HeaderMenu };
