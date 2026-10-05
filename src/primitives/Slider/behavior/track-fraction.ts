/* @layer renderer-components @kind util */
import { clampNumber } from '../../value-rule/clamp-number';

const trackFraction = (clientX: number, rect: Pick<DOMRect, 'left' | 'width' | 'height'>): number => {
  const inset = rect.height / 2;
  const span = rect.width - inset * 2;
  if (span <= 0) return 0;
  return clampNumber((clientX - rect.left - inset) / span, 0, 1);
};

export { trackFraction };
