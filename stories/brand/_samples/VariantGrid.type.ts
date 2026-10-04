/* @layer stories @kind types */
import type { ReactNode } from 'react';

type VariantGridMin = 'sm' | 'md' | 'lg' | 'xl';

type VariantGround = 'dark' | 'light';

interface VariantGridItem {
  key: string;
  label: string;
  node: ReactNode;
  ground?: VariantGround;
}

interface VariantGridProps {
  items: readonly VariantGridItem[];
  min?: VariantGridMin;
  rowsOf?: 3;
}

interface VariantGridGroup {
  key: string;
  label: string;
  items: readonly VariantGridItem[];
  min?: VariantGridMin;
}

interface VariantGroupsProps {
  groups: readonly VariantGridGroup[];
  min?: VariantGridMin;
  rowsOf?: 3;
}

export type { VariantGridMin, VariantGridProps, VariantGroupsProps, VariantGround };
