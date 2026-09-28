/* @layer renderer-components @kind types */
import type { PixelWordmarkColors } from '../composites/PixelWordmark';

type BrandApp = 'tessera' | 'brock' | 'archipelia' | 'rotp';

interface BrandMarkPath {
  d: string;
  ink: string;
  group?: BrandApp;
  evenOdd?: boolean;
  opacity?: number;
}

interface BrandMarkData {
  viewBox: string;
  paths: readonly BrandMarkPath[];
  pixelArt?: boolean;
}

interface BrandWordmarkSpec {
  text: string;
  colors: PixelWordmarkColors;
}

interface BrandInfo {
  id: BrandApp;
  name: string;
  kind: string;
  colour: string;
  colourName: string;
  tile: string;
  summary: string;
  placement: string;
  mark: BrandMarkData;
  mascot?: BrandMarkData;
  wordmark: BrandWordmarkSpec;
}

export type { BrandApp, BrandInfo, BrandMarkData, BrandMarkPath, BrandWordmarkSpec };
