/* @layer renderer-components @kind types */
import type { PixelWordmarkSize } from '../../composites/PixelWordmark';
import type { BrandMarkSize, BrandMarkVariant } from '../BrandMark';
import type { BrandApp } from '../brand.type';

type LogoDirection = 'stacked' | 'inline';

interface LogoProps {
  brand?: BrandApp;
  size?: BrandMarkSize;
  variant?: BrandMarkVariant;
  tile?: boolean;
  title?: string;
  className?: string;
}

interface LogoWordmarkProps {
  brand?: BrandApp;
  size?: PixelWordmarkSize;
  title?: string;
  className?: string;
}

interface LogoCombinedProps extends LogoProps {
  direction?: LogoDirection;
}

export type { LogoCombinedProps, LogoDirection, LogoProps, LogoWordmarkProps };
