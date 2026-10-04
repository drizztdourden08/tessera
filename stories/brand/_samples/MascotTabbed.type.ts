/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { AnimatedMascotBrand } from '../../../src/brand';

interface MascotTabbedProps {
  draw: (brand: AnimatedMascotBrand) => ReactNode;
  tabs?: boolean;
}

export type { MascotTabbedProps };
