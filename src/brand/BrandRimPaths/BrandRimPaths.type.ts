/* @layer renderer-components @kind types */
import type { BrandRimTone } from '../rim.type';

interface BrandRimPathsProps {
  paths: readonly { d: string }[];
  tone: BrandRimTone;
  pixelArt?: boolean;
  fine?: boolean;
}

export type { BrandRimPathsProps };
