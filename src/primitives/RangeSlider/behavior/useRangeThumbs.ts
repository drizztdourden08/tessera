/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { keyDelta } from './key-delta';
import type { RangeThumbs, Thumb } from './useRangeThumbs.type';

const useRangeThumbs = (
  value: readonly [number, number],
  onChange: (next: [number, number]) => void,
  last: number,
  step: number,
): RangeThumbs => {
  const [low, high] = value;
  const [active, setActive] = useState<Thumb>('high');

  const setLow = (next: number) => {
    setActive('low');
    onChange([Math.min(Math.max(0, next), high), high]);
  };
  const setHigh = (next: number) => {
    setActive('high');
    onChange([low, Math.max(Math.min(last, next), low)]);
  };

  const handleKey = (which: Thumb) => (event: KeyboardEvent<HTMLInputElement>) => {
    const current = which === 'low' ? low : high;
    const set = which === 'low' ? setLow : setHigh;
    const delta = keyDelta(event.key, step);
    if (delta !== 0) set(current + delta);
    else if (event.key === 'Home') set(0);
    else if (event.key === 'End') set(last);
    else return;
    event.preventDefault();
  };

  return { active, setActive, setLow, setHigh, handleKey };
};

export { useRangeThumbs };
