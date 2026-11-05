/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type AsideWidth = 'sm' | 'md' | 'lg';
type AsideSide = 'start' | 'end';

interface AsideLayoutProps {
  main: ReactNode;
  aside: ReactNode;
  asideWidth?: AsideWidth;
  breakpoint?: number;
  side?: AsideSide;
  onAsideChange?: (shown: boolean) => void;
  asideLabel?: string;
  className?: string;
}

export type { AsideLayoutProps, AsideSide, AsideWidth };
