/* @layer renderer-components @kind types */
import type { BrandRimTone } from '../rim.type';

interface BrandRimPathsProps {
  paths: readonly { d: string }[];
  tone: BrandRimTone;
  pixelArt?: boolean;
}

export type { BrandRimPathsProps };
