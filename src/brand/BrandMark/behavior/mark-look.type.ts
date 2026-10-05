/* @layer renderer-components @kind types */
import type { BrandMarkPath } from '../../brand.type';
import type { BrandRim } from '../../rim.type';

interface MarkLook {
  paths: readonly BrandMarkPath[];
  rim: BrandRim;
  fine: boolean;
}

export type { MarkLook };
