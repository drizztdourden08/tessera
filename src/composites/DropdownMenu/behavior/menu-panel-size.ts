/* @layer renderer-components @kind util */
import type { ControlSize } from '../../../primitives/field-control/field-control.type';
import type { MenuTriggerSize } from '../DropdownMenu.type';

const menuPanelSize = (size: MenuTriggerSize): ControlSize => (size === 'xs' || size === '2xs' ? 'sm' : size);

export { menuPanelSize };
