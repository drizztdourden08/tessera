/* @layer renderer-components @kind types */
import type { PixelWordmarkSize } from '../../composites/PixelWordmark';
import type { BrandApp } from '../brand.type';
import type { BrandRim } from '../rim.type';

interface BrandWordmarkProps {
  app: BrandApp;
  size?: PixelWordmarkSize;
  rim?: BrandRim;
  title?: string;
  className?: string;
}

export type { BrandWordmarkProps };
