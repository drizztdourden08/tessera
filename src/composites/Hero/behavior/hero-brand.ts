/* @layer renderer-components @kind logic */
import type { BrandApp } from '../../../brand/brand.type';
import { BRAND_APPS } from '../../../brand/family.constants';

const heroBrand = (brand: BrandApp | undefined, palette: string | null): BrandApp =>
  brand ?? BRAND_APPS.find((app) => app === palette) ?? 'tessera';

export { heroBrand };
