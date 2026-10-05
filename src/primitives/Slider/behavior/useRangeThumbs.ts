/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { clampNumber } from '../../value-rule/clamp-number';
import type { ValueScale } from '../../value-rule/value-rule.type';
import { clampValue } from './clamp-value';
import type { RangeThumbs, Thumb } from './useRangeThumbs.type';

const useRangeThumbs = (pair: [number, number], onPair: (next: [number, number]) => void, scale: ValueScale): RangeThumbs => {
  const [low, high] = pair;
  const [active, setActive] = useState<Thumb>('high');
  const lowRef = useRef<HTMLInputElement>(null);
  const highRef = useRef<HTMLInputElement>(null);

  const setLow = (next: number) => {
    setActive('low');
    const value = clampNumber(clampValue(next, scale), scale.min, high);
    if (value !== low) onPair([value, high]);
  };
  const setHigh = (next: number) => {
    setActive('high');
    const value = clampNumber(clampValue(next, scale), low, scale.max);
    if (value !== high) onPair([low, value]);
  };
  const lowOnTop = low === high && (high === scale.max || (low !== scale.min && active === 'low'));

  return { low, high, lowOnTop, lowRef, highRef, setLow, setHigh, setActive };
};

export { useRangeThumbs };
