/* @layer renderer-components @kind logic */
import { MASCOT_BRANDS } from '../AnimatedMascot.constants';
import type { AnimatedMascotBrand } from '../AnimatedMascot.type';

const mascotBrandOf = (palette: string | null | undefined): AnimatedMascotBrand | null =>
  MASCOT_BRANDS.find((brand) => brand === palette) ?? null;

export { mascotBrandOf };
