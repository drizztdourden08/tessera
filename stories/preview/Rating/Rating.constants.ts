/* @layer stories @kind constants */
import type { RatingSize } from './Rating.type';

const RATING_MAX = 5;

const RATING_STAR_PX: Readonly<Record<RatingSize, number>> = { sm: 14, md: 18, lg: 26 };

export { RATING_MAX, RATING_STAR_PX };
