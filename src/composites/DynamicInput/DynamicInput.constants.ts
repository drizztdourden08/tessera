/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { PatternSlotType } from './behavior/parse-pattern.type';

const FALLBACK_ACTION_ICON: IconName = 'zap';

const POPOVER_GAP = 6;

const TIME_TYPES: readonly PatternSlotType[] = ['hour', 'minute'];

const DEFAULT_COLOR = '#000000';

export { DEFAULT_COLOR, FALLBACK_ACTION_ICON, POPOVER_GAP, TIME_TYPES };
