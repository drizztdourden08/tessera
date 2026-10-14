/* @layer stories @kind hook */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { RatingPick } from '../Rating.type';

const KEY_STEP: Readonly<Record<string, number>> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };

const RTL_SWAP: Readonly<Record<string, string>> = { ArrowLeft: 'ArrowRight', ArrowRight: 'ArrowLeft' };

const nextStar = (key: string, current: number, max: number): number | null => {
  if (key === 'Home') return 1;
  if (key === 'End') return max;
  const step = KEY_STEP[key];
  if (step === undefined) return null;
  return Math.min(max, Math.max(1, current + step));
};

const useRatingPick = (value: number | null, max: number, onChange: (value: number) => void): RatingPick => {
  const [hovered, setHovered] = useState<number | null>(null);
  const chosen = value ?? 0;

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const star = nextStar((rtl ? RTL_SWAP[event.key] : undefined) ?? event.key, chosen, max);
    if (star === null) return;
    event.preventDefault();
    onChange(star);
    event.currentTarget.querySelector<HTMLElement>(`[data-star="${star}"]`)?.focus();
  };

  return { shown: hovered ?? chosen, tabStop: Math.max(1, Math.round(chosen)), hover: setHovered, onKeyDown };
};

export { useRatingPick };
