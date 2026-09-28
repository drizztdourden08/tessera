/* @layer renderer-components @kind logic */
import type { BrandInfo, BrandMarkData } from '../../brand.type';
import type { BrandMarkVariant } from '../BrandMark.type';

const pickMarkArt = (brand: BrandInfo, variant: BrandMarkVariant): BrandMarkData => (
  variant === 'mascot' ? brand.mascot ?? brand.mark : brand.mark
);

export { pickMarkArt };
