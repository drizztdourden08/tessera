/* @layer stories @kind types */
import type { BrandApp, IconArtFiles } from '../../../src/brand';

interface IconFileRowsProps {
  pick: (app: BrandApp, files: IconArtFiles) => boolean;
}

export type { IconFileRowsProps };
