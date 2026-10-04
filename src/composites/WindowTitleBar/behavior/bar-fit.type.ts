/* @layer renderer-components @kind types */
import type { BrandFit } from '../WindowTitleBar.type';

interface BarFit {
  hidden: readonly string[];
  brand: BrandFit;
}

export type { BarFit };
