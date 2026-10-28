/* @layer renderer-components @kind logic */
import type { BrandInkTone, BrandMarkData } from './brand.type';
import { CURRENT_INK } from './mark-ink.constants';

const markInk = (mark: BrandMarkData, tone: BrandInkTone): BrandMarkData => {
  const { currentInk } = mark;
  if (!currentInk) return mark;
  return { ...mark, paths: mark.paths.map((p) => (p.ink === CURRENT_INK ? { ...p, ink: currentInk[tone] } : p)) };
};

export { markInk };
