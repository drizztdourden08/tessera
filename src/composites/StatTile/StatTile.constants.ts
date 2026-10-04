/* @layer renderer-components @kind data */
import type { StatTrend } from './StatTile.type';

const TREND_ICONS = { up: 'arrow-up', down: 'arrow-down', flat: 'arrow-right' } as const satisfies Record<StatTrend, string>;

const TREND_WORDS = { up: 'rising', down: 'falling', flat: 'steady' } as const satisfies Record<StatTrend, string>;

const TREND_ICON_SIZE = 12;

export { TREND_ICON_SIZE, TREND_ICONS, TREND_WORDS };
