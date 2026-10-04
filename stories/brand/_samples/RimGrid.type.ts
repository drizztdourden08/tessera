/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { BrandApp, BrandRim } from '../../../src/brand';

type RimGround = 'dark' | 'light';

interface RimColumn {
  key: string;
  label: string;
  ground: RimGround;
  rim: BrandRim;
}

interface RimGridProps {
  draw: (app: BrandApp, rim: BrandRim) => ReactNode;
}

export type { RimColumn, RimGridProps, RimGround };
