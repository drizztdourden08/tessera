/* @layer root-config @kind logic */
import { BRAND_FAMILY } from '../src/brand/family.constants';
import type { BrandApp } from '../src/brand/brand.type';
import { artSvg } from './art-svg';

const markSvg = (app: BrandApp, size: string, className = ''): string =>
  artSvg(BRAND_FAMILY[app].mark, size, className);

export { markSvg };
