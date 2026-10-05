/* @layer renderer-components @kind types */
import type { BrandMarkPath } from '../../brand.type';
import type { BrandRim } from '../../rim.type';
import type { ViewBoxRect } from '../behavior/parse-view-box.type';

interface BrandMarkRimProps {
  rim: BrandRim;
  paths: readonly BrandMarkPath[];
  box: ViewBoxRect;
  tile: boolean;
  pixelArt?: boolean;
  fine?: boolean;
}

export type { BrandMarkRimProps };
