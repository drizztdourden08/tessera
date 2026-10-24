/* @layer stories @kind logic */
import { BRAND_FAMILY } from '../../../src/brand';
import type { BrandApp } from '../../../src/brand/brand.type';

const WIDE_RATIO = 2;

const splashMarkClass = (app: BrandApp): string => {
  const [, , w, h] = BRAND_FAMILY[app].mark.viewBox.split(' ').map(Number);
  return (w ?? 1) / (h ?? 1) >= WIDE_RATIO ? 'ts-mark ts-mark--wide' : 'ts-mark';
};

export { splashMarkClass };
