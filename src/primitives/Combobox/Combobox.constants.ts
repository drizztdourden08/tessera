/* @layer renderer-components @kind data */
import type { ControlSize } from '../field-control/field-control.type';
import type { IconButtonSize } from '../IconButton/IconButton.type';

const CLEAR_BUTTON_SIZES: Readonly<Record<ControlSize, IconButtonSize>> = { md: 'sm', sm: 'xs' };

export { CLEAR_BUTTON_SIZES };
