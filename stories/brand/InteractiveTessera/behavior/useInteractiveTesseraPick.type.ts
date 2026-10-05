/* @layer stories @kind types */
import type { BrandApp } from '../../../../src/brand/brand.type';

interface PickParams {
  selected?: BrandApp | null;
  defaultSelected?: BrandApp | null;
  onSelect?: (app: BrandApp | null) => void;
}

export type { PickParams };
