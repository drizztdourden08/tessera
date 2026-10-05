/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { PatternSlotType } from './behavior/parse-pattern.type';

const FALLBACK_ACTION_ICON: IconName = 'zap';

const TIME_TYPES: readonly PatternSlotType[] = ['hour', 'minute'];

const DEFAULT_COLOR = '#000000';

export { DEFAULT_COLOR, FALLBACK_ACTION_ICON, TIME_TYPES };
