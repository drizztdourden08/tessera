/* @layer root-config @kind logic */
import { BRAND_FAMILY } from '../src/brand/family.constants';
import { buildPixelWordmark } from '../src/composites/PixelWordmark/build/buildPixelWordmark';
import type { BrandApp } from '../src/brand/brand.type';
import { artSvg } from './art-svg';

const wordmarkSvg = (app: BrandApp, height: string, className = ''): string => {
  const { wordmark, name } = BRAND_FAMILY[app];
  const art = buildPixelWordmark(wordmark.text, wordmark.colors);
  return artSvg({ viewBox: art.viewBox, paths: art.paths, pixelArt: true }, height, className, name);
};

export { wordmarkSvg };
