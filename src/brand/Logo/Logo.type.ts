/* @layer renderer-components @kind types */
import type { PixelWordmarkSize } from '../PixelWordmark';
import type { BrandMarkSize, BrandMarkVariant } from '../BrandMark';
import type { BrandApp, BrandInks } from '../brand.type';
import type { BrandRim } from '../rim.type';
import type { Ground } from '../../primitives/ground/ground.type';

type LogoDirection = 'stacked' | 'inline';

interface LogoProps {
  brand?: BrandApp;
  size?: BrandMarkSize;
  variant?: BrandMarkVariant;
  rim?: BrandRim;
  ground?: Ground;
  inks?: BrandInks;
  title?: string;
  className?: string;
}

interface LogoWordmarkProps {
  brand?: BrandApp;
  size?: PixelWordmarkSize;
  rim?: BrandRim;
  title?: string;
  className?: string;
}

interface LogoCombinedProps extends LogoProps {
  direction?: LogoDirection;
}

export type { LogoCombinedProps, LogoDirection, LogoProps, LogoWordmarkProps };
