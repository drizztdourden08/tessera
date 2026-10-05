/* @layer stories @kind types */
import type { BrandApp } from '../../../src/brand';
import type { LogoProps } from '../../../src/brand';

interface MarkOnGroundProps {
  brand: BrandApp;
  ground: NonNullable<LogoProps['ground']>;
}

export type { MarkOnGroundProps };
