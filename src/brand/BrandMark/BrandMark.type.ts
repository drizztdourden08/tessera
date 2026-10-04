/* @layer renderer-components @kind types */
import type { BrandApp } from '../brand.type';
import type { BrandRim } from '../rim.type';

type BrandMarkSize = 'sm' | 'md' | 'lg' | 'xl';

type BrandMarkVariant = 'mark' | 'app-icon';

interface BrandMarkProps {
  app: BrandApp;
  size?: BrandMarkSize;
  variant?: BrandMarkVariant;
  rim?: BrandRim;
  title?: string;
  className?: string;
}

export type { BrandMarkProps, BrandMarkSize, BrandMarkVariant };
