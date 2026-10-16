/* @layer renderer-components @kind types */
import type { BrandFit, WindowTitleBarItemId } from '../WindowTitleBar.type';

interface BarFit {
  hidden: readonly WindowTitleBarItemId[];
  brand: BrandFit;
}

export type { BarFit };
