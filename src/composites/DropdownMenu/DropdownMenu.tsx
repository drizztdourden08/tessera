/* @layer renderer-components @kind component */
import { AnchoredMenu } from './sub-components/AnchoredMenu';
import { TriggerMenu } from './sub-components/TriggerMenu';
import type { DropdownMenuProps } from './DropdownMenu.type';
import '../../theme/focus-ring.css';
import '../../theme/dropdown-menu.css';
import '../../theme/dropdown-look.css';

const DropdownMenu = (props: DropdownMenuProps) => (
  props.trigger === undefined ? <AnchoredMenu {...props} /> : <TriggerMenu {...props} />
);

export { DropdownMenu };
