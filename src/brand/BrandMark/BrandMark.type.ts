/* @layer renderer-components @kind types */
import type { Ground } from '../../primitives/ground/ground.type';
import type { BrandApp, BrandInks } from '../brand.type';
import type { BrandRim } from '../rim.type';

type BrandMarkSize = 'sm' | 'md' | 'lg' | 'xl';

type BrandMarkVariant = 'mark' | 'app-icon';

interface BrandMarkProps {
  app: BrandApp;
  size?: BrandMarkSize;
  variant?: BrandMarkVariant;
  rim?: BrandRim;
  ground?: Ground;
  inks?: BrandInks;
  title?: string;
  className?: string;
}

export type { BrandMarkProps, BrandMarkSize, BrandMarkVariant };
