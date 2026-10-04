/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { BrandApp, BrandRim } from '../../../src/brand';
import type { VariantGridMin, VariantGround } from './VariantGrid.type';

interface RimColumn {
  key: string;
  label: string;
  ground: VariantGround;
  rim: BrandRim;
}

interface RimGridProps {
  draw: (app: BrandApp, rim: BrandRim) => ReactNode;
  min?: VariantGridMin;
}

export type { RimColumn, RimGridProps };
