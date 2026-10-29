/* @layer renderer-components @kind types */
import type { BrandMarkSize } from '../BrandMark';
import type { BrandApp, MascotPose } from '../brand.type';

interface MascotProps {
  brand?: BrandApp;
  variant?: string;
  pose?: MascotPose;
  size?: Exclude<BrandMarkSize, 'h26' | 'h39'>;
  scale?: number;
  title?: string;
  className?: string;
}

export type { MascotProps };
