/* @layer renderer-components @kind logic */
import type { BrandMascot, BrandMascotVariant } from '../../brand.type';

const pickMascotVariant = (mascot: BrandMascot, id: string | undefined): BrandMascotVariant =>
  mascot.variants.find((v) => v.id === id) ?? mascot.variants[0];

export { pickMascotVariant };
