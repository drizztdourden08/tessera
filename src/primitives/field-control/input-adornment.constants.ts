/* @layer renderer-components @kind data */
import type { IconButtonSize } from '../IconButton/IconButton.type';
import type { ControlSize } from './field-control.type';

const ADORNMENT_ICON_SIZES: Readonly<Record<ControlSize, number>> = { md: 16, sm: 14 };

const ADORNMENT_BUTTON_SIZES: Readonly<Record<ControlSize, IconButtonSize>> = { md: 'sm', sm: 'xs' };

export { ADORNMENT_BUTTON_SIZES, ADORNMENT_ICON_SIZES };
