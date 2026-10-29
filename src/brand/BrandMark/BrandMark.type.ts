/* @layer renderer-components @kind types */
import type { BrandApp } from '../brand.type';
import type { BrandRim } from '../rim.type';

type BrandMarkSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'h26' | 'h39' | 'fill';

type BrandMarkFit = 'square' | 'height';

type BrandMarkVariant = 'mark' | 'app-icon';

interface BrandMarkProps {
  app: BrandApp;
  size?: BrandMarkSize;
  fit?: BrandMarkFit;
  variant?: BrandMarkVariant;
  rim?: BrandRim;
  title?: string;
  className?: string;
}

export type { BrandMarkFit, BrandMarkProps, BrandMarkSize, BrandMarkVariant };
