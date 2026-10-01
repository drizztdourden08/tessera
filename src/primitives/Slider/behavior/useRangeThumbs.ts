/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { clampValue } from './clamp-value';
import { nearestThumb } from './nearest-thumb';
import type { SliderScale } from './slider-scale.type';
import { snapValue } from './snap-value';
import type { RangeThumbs, Thumb } from './useRangeThumbs.type';

const useRangeThumbs = (pair: [number, number], onPair: (next: [number, number]) => void, scale: SliderScale): RangeThumbs => {
  const [low, high] = pair;
  const [active, setActive] = useState<Thumb>('high');
  const lowRef = useRef<HTMLInputElement>(null);
  const highRef = useRef<HTMLInputElement>(null);

  const setLow = (next: number) => {
    setActive('low');
    onPair([Math.min(clampValue(next, scale), high), high]);
  };
  const setHigh = (next: number) => {
    setActive('high');
    onPair([low, Math.max(clampValue(next, scale), low)]);
  };
  const pickTrack = (fraction: number) => {
    const at = scale.min + fraction * (scale.max - scale.min);
    const which = nearestThumb(at, low, high);
    (which === 'low' ? setLow : setHigh)(snapValue(at, scale));
    (which === 'low' ? lowRef : highRef).current?.focus();
  };
  const lowOnTop = low === high && (high === scale.max || (low !== scale.min && active === 'low'));

  return { low, high, lowOnTop, lowRef, highRef, setLow, setHigh, setActive, pickTrack };
};

export { useRangeThumbs };
