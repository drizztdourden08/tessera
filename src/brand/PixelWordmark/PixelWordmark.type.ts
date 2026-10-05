/* @layer renderer-components @kind types */
import type { BrandRim } from '../rim.type';

interface PixelGlyph {
  upper: readonly string[];
  lower: readonly string[];
}

type PixelWordmarkColors = readonly [string, string, string, string];

interface PixelWordmarkPath {
  ink: string;
  d: string;
}

interface PixelWordmarkArt {
  viewBox: string;
  width: number;
  height: number;
  paths: readonly PixelWordmarkPath[];
}

type PixelWordmarkSize = 'sm' | 'md' | 'lg';

interface PixelWordmarkProps {
  text: string;
  colors: PixelWordmarkColors;
  size?: PixelWordmarkSize;
  rim?: BrandRim;
  title?: string;
  className?: string;
}

export type {
  PixelGlyph,
  PixelWordmarkArt,
  PixelWordmarkColors,
  PixelWordmarkPath,
  PixelWordmarkProps,
  PixelWordmarkSize,
};
