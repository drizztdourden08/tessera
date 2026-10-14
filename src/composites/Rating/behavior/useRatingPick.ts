/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { RATING_RTL_KEY } from '../Rating.constants';
import type { RatingPick } from '../Rating.type';
import { focusedStar } from './focused-star';
import { nextStar } from './next-star';

const useRatingPick = (value: number | null, max: number, onChange: (value: number) => void): RatingPick => {
  const [hovered, setHovered] = useState<number | null>(null);
  const chosen = value ?? 0;

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const star = nextStar((rtl ? RATING_RTL_KEY[event.key] : undefined) ?? event.key, focusedStar(event.target, Math.round(chosen)), max);
    if (star === null) return;
    event.preventDefault();
    if (star !== value) onChange(star);
    event.currentTarget.querySelector<HTMLElement>(`[data-star="${star}"]`)?.focus();
  };

  return { shown: hovered ?? chosen, tabStop: Math.min(max, Math.max(1, Math.round(chosen))), hover: setHovered, onKeyDown };
};

export { useRatingPick };
