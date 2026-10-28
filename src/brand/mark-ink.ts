/* @layer renderer-components @kind logic */
import type { BrandInkTone, BrandMarkData } from './brand.type';

const CURRENT = 'currentColor';

const markInk = (mark: BrandMarkData, tone: BrandInkTone): BrandMarkData => {
  const { currentInk } = mark;
  if (!currentInk) return mark;
  return { ...mark, paths: mark.paths.map((p) => (p.ink === CURRENT ? { ...p, ink: currentInk[tone] } : p)) };
};

export { markInk };
