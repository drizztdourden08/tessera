/* @layer renderer-components @kind data */
import type { StackedBarColor } from './StackedBar.type';

const AUTO_COLORS: readonly StackedBarColor[] = ['blue', 'violet', 'teal', 'amber', 'pink', 'lime', 'cyan', 'orange', 'rose', 'green'];

const OTHER_ID = 'stacked-bar:other';

const FREE_ID = 'stacked-bar:free';

const OTHER_COLOR: StackedBarColor = 'neutral';

const DEFAULT_LIMIT = 6;

export { AUTO_COLORS, DEFAULT_LIMIT, FREE_ID, OTHER_COLOR, OTHER_ID };
