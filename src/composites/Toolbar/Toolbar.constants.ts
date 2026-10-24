/* @layer renderer-components @kind data */
import type { MenuSide } from '../DropdownMenu/DropdownMenu.type';
import type { TooltipPlacement } from '../../primitives/Tooltip';
import type { ToolbarOrientation } from './Toolbar.type';

const STOP_ATTRIBUTE = 'data-toolbar-stop';

const STOP_SELECTOR = '[data-toolbar-stop]';

const HANDLE_STOP = '#handle';

const MORE_STOP = '#more';

const ARROW_STEPS: Readonly<Record<ToolbarOrientation, Readonly<Record<string, number>>>> = {
  horizontal: { ArrowRight: 1, ArrowLeft: -1 },
  vertical: { ArrowDown: 1, ArrowUp: -1 },
};

const OPEN_KEY: Readonly<Record<ToolbarOrientation, string>> = { horizontal: 'ArrowDown', vertical: 'ArrowRight' };

const MENU_SIDE: Readonly<Record<ToolbarOrientation, MenuSide>> = { horizontal: 'below', vertical: 'right' };

const TIP_SIDE: Readonly<Record<ToolbarOrientation, TooltipPlacement>> = { horizontal: 'bottom', vertical: 'right' };

const FIELD_LEAVE_KEY = 'Escape';

export { ARROW_STEPS, FIELD_LEAVE_KEY, HANDLE_STOP, MENU_SIDE, MORE_STOP, OPEN_KEY, STOP_ATTRIBUTE, STOP_SELECTOR, TIP_SIDE };
