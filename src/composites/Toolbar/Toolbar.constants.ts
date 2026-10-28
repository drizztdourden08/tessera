/* @layer renderer-components @kind data */
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

const TIP_SIDE: Readonly<Record<ToolbarOrientation, TooltipPlacement>> = { horizontal: 'bottom', vertical: 'right' };

const FIELD_LEAVE_KEY = 'Escape';

const SEPARATOR_CLASS = 'toolbar__separator';

const WRAPPED_COLUMNS = 2;

export { ARROW_STEPS, FIELD_LEAVE_KEY, HANDLE_STOP, MORE_STOP, SEPARATOR_CLASS, STOP_ATTRIBUTE, STOP_SELECTOR, TIP_SIDE, WRAPPED_COLUMNS };
