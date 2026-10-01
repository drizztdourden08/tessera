/* @layer renderer-components @kind component */
import { AnchoredMenu } from './sub-components/AnchoredMenu';
import { MenuButton } from './sub-components/MenuButton';
import type { DropdownMenuProps } from './DropdownMenu.type';
import '../../theme/focus-ring.css';
import '../../theme/dropdown-menu.css';

const DropdownMenu = (props: DropdownMenuProps) => (
  props.trigger === undefined ? <AnchoredMenu {...props} /> : <MenuButton {...props} />
);

export { DropdownMenu };
