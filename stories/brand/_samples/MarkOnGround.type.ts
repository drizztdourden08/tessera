/* @layer stories @kind types */
import type { BrandApp, BrandInks } from '../../../src/brand';
import type { LogoProps } from '../../../src/brand';

interface MarkOnGroundProps {
  brand: BrandApp;
  ground: NonNullable<LogoProps['ground']>;
  inks?: BrandInks;
}

export type { MarkOnGroundProps };
