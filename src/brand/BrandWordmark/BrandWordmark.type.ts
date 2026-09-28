/* @layer renderer-components @kind types */
import type { PixelWordmarkSize } from '../../composites/PixelWordmark';
import type { BrandApp } from '../brand.type';

interface BrandWordmarkProps {
  app: BrandApp;
  size?: PixelWordmarkSize;
  title?: string;
  className?: string;
}

export type { BrandWordmarkProps };
