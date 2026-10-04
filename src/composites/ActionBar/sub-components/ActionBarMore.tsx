/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { MORE_CLASS } from '../ActionBar.constants';
import { menuGroups } from '../behavior/menu-groups';
import type { ActionBarMoreProps } from '../ActionBar.type';

const ActionBarMore = (props: ActionBarMoreProps) => {
  const { size, label } = props;
  const { items } = useTesseraStrings();
  return (
    <DropdownMenu
      size={size}
      variant="secondary"
      className={MORE_CLASS}
      trigger={{ label, icon: 'ellipsis', iconOnly: true }}
      groups={menuGroups(props, items.asksFirst)}
    />
  );
};

export { ActionBarMore };
