/* @layer renderer-components @kind types */
import type { BrandApp } from '../brand.type';

type BrandMarkSize = 'sm' | 'md' | 'lg' | 'xl';

type BrandMarkVariant = 'mark' | 'app-icon';

interface BrandMarkProps {
  app: BrandApp;
  size?: BrandMarkSize;
  variant?: BrandMarkVariant;
  title?: string;
  className?: string;
}

export type { BrandMarkProps, BrandMarkSize, BrandMarkVariant };
