/* @layer renderer-components @kind util */
import type { ControlSize } from '../../../primitives/field-control/field-control.type';
import type { MenuSize } from '../DropdownMenu.type';

const menuPanelSize = (size: MenuSize): ControlSize => (size === 'xs' ? 'sm' : size);

export { menuPanelSize };
