/* @layer stories @kind logic */
import { BRAND_FAMILY, BrandMark, PixelWordmark } from '../../../../src/brand';
import type { SiteHeaderBrand } from '../SiteHeader.type';
import { SITE_TEXT } from './site-samples.constants';

const hookshopBrand = (): SiteHeaderBrand => ({
  mark: <BrandMark app="rotp" size="md" />,
  name: <PixelWordmark text={SITE_TEXT.wordmark} colors={BRAND_FAMILY.rotp.wordmark.colors} size="sm" />,
  label: SITE_TEXT.homeLabel,
  href: '#home',
});

export { hookshopBrand };
