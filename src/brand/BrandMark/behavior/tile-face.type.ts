/* @layer renderer-components @kind types */
import type { BrandMarkData } from '../../brand.type';

interface TileFace {
  tile: boolean;
  drawn: BrandMarkData;
  scale: number;
}

export type { TileFace };
