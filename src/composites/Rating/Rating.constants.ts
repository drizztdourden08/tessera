/* @layer renderer-components @kind data */
import type { RatingSize } from './Rating.type';

const RATING_MAX = 5;

const RATING_STAR_PX: Readonly<Record<RatingSize, number>> = { sm: 14, md: 18, lg: 26 };

const RATING_KEY_STEP: Readonly<Record<string, number>> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };

const RATING_RTL_KEY: Readonly<Record<string, string>> = { ArrowLeft: 'ArrowRight', ArrowRight: 'ArrowLeft' };

export { RATING_KEY_STEP, RATING_MAX, RATING_RTL_KEY, RATING_STAR_PX };
