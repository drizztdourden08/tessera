/* @layer stories @kind types */
import type { BrandApp, BrandRim, IconArtFiles } from '../../../src/brand';

interface IconFileRowsProps {
  pick: (app: BrandApp, files: IconArtFiles) => boolean;
  rims?: readonly BrandRim[];
}

export type { IconFileRowsProps };
