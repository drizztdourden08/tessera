/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import { Glyph } from '../../../primitives/Icon';
import { DropdownMenu } from '../../DropdownMenu';
import { useMenuOpen } from '../../field-kits/behavior/useMenuOpen';
import { buildTableMenuItems } from '../behavior/table-menu-items';
import type { TableOptionsMenuProps } from './TableOptionsMenu.type';

const TableOptionsMenu = (props: TableOptionsMenuProps) => {
  const { sortActive, groupActive, fieldNodes, actions } = props;
  const menu = useMenuOpen<HTMLButtonElement>();

  const items = buildTableMenuItems({
    sortActive, groupActive, fieldNodes, actions, onClose: menu.close,
  });

  return (
    <>
      <Pressable
        ref={menu.anchorRef}
        className="data-table__options"
        aria-label="Table options"
        aria-haspopup="menu"
        aria-expanded={menu.open}
        title="Table options"
        onClick={menu.toggle}
      >
        <Glyph name="gear" />
      </Pressable>
      {menu.open && <DropdownMenu items={items} anchorRef={menu.anchorRef} side="above" align="end" />}
    </>
  );
};

export { TableOptionsMenu };
