/* @layer renderer-components @kind types */
import type { BrandMarkPath } from './brand.type';
import type { BrandRimTone } from './rim.type';

interface GroundLook {
  paths: readonly BrandMarkPath[];
  outline?: BrandRimTone;
}

export type { GroundLook };
