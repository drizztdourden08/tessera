/* @layer renderer-components @kind types */
import type { BrandApp } from '../../brand.type';

interface PickParams {
  selected?: BrandApp | null;
  defaultSelected?: BrandApp | null;
  onSelect?: (app: BrandApp | null) => void;
}

export type { PickParams };
