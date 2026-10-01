/* @layer renderer-components @kind util */
import type { SliderScale } from './slider-scale.type';

const percentOf = (value: number, scale: SliderScale): number => {
  const span = scale.max - scale.min;
  if (span <= 0) return 0;
  return Math.min(100, Math.max(0, ((value - scale.min) / span) * 100));
};

export { percentOf };
