/* @layer stories @kind logic */
import { RATING_STRINGS } from '../rating-strings.constants';

const ratingLabel = (value: number | null, max: number, count: number | undefined): string => {
  if (value === null) return RATING_STRINGS.none;
  const base = RATING_STRINGS.outOf(value.toFixed(1), max);
  return count === undefined ? base : `${base}, ${RATING_STRINGS.from(count)}`;
};

export { ratingLabel };
