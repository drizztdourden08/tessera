/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import { Glyph } from '../../../primitives/Glyph';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { useMenuOpen } from '../../field-kits/behavior/useMenuOpen';
import { buildTableMenuItems } from '../behavior/table-menu-items';
import type { TableOptionsMenuProps } from './TableOptionsMenu.type';

const TableOptionsMenu = (props: TableOptionsMenuProps) => {
  const { sortActive, groupActive, fieldNodes, actions } = props;
  const menu = useMenuOpen<HTMLButtonElement>();
  const { table } = useTesseraStrings();

  const items = buildTableMenuItems({
    sortActive, groupActive, fieldNodes, actions, onClose: menu.close, strings: table,
  });

  return (
    <>
      <Pressable
        ref={menu.anchorRef}
        className="data-table__options"
        aria-label={table.tableOptions}
        aria-haspopup="menu"
        aria-expanded={menu.open}
        title={table.tableOptions}
        onClick={menu.toggle}
      >
        <Glyph name="gear" />
      </Pressable>
      {menu.open && <DropdownMenu groups={[{ id: 'table', items }]} anchorRef={menu.anchorRef} side="above" align="end" onClose={menu.close} />}
    </>
  );
};

export { TableOptionsMenu };
