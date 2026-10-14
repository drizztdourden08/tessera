/* @layer stories @kind logic */
import type { RatingStarFill } from '../Rating.type';

const starFill = (value: number, star: number): RatingStarFill => {
  const halves = Math.round(value * 2) / 2;
  if (halves >= star) return 'full';
  return halves >= star - 0.5 ? 'half' : 'empty';
};

export { starFill };
