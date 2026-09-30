/* @layer renderer-components @kind types */
import type { BrandApp } from '../../brand.type';
import type { TileSpot } from '../InteractiveTessera.type';

interface LogoArtProps {
  spots: readonly TileSpot[];
  isLit: (app: BrandApp) => boolean;
}

export type { LogoArtProps };
