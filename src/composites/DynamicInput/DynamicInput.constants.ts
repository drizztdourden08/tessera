/* @layer renderer-components @kind data */
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { IconButtonSize } from '../../primitives/IconButton/IconButton.type';
import type { PatternSlotType } from './behavior/parse-pattern.type';

const FALLBACK_ACTION_ICON: IconName = 'zap';

const POPOVER_GAP = 6;

const TIME_TYPES: readonly PatternSlotType[] = ['hour', 'minute'];

const ICON_SIZES: Readonly<Record<ControlSize, number>> = { md: 16, sm: 14 };

const ACTION_SIZES: Readonly<Record<ControlSize, IconButtonSize>> = { md: 'sm', sm: 'xs' };

const DEFAULT_COLOR = '#000000';

export { ACTION_SIZES, DEFAULT_COLOR, FALLBACK_ACTION_ICON, ICON_SIZES, POPOVER_GAP, TIME_TYPES };
