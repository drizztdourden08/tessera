/* @layer renderer-components @kind logic */
import type { BrandMascot, BrandMascotVariant } from '../../brand.type';

const mascotTitle = (mascot: BrandMascot, variant: BrandMascotVariant): string =>
  (variant === mascot.variants[0] ? mascot.name : `${mascot.name}, ${variant.name}`);

export { mascotTitle };
