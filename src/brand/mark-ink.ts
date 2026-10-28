/* @layer renderer-components @kind logic */
import type { BrandInkTone, BrandMarkData } from './brand.type';
import { CURRENT } from './mark-ink.constants';

const markInk = (mark: BrandMarkData, tone: BrandInkTone): BrandMarkData => {
  const { currentInk } = mark;
  if (!currentInk) return mark;
  return { ...mark, paths: mark.paths.map((p) => (p.ink === CURRENT ? { ...p, ink: currentInk[tone] } : p)) };
};

export { markInk };
