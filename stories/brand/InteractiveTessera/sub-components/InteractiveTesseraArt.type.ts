/* @layer stories @kind types */
import type { BrandApp } from '../../../../src/brand/brand.type';
import type { TileSpot } from '../InteractiveTessera.type';

interface InteractiveTesseraArtProps {
  spots: readonly TileSpot[];
  isLit: (app: BrandApp) => boolean;
}

export type { InteractiveTesseraArtProps };
