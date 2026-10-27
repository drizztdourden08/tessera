/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type SeatGridMinWidth = 'sm' | 'md' | 'lg';

type SeatGridGap = 'xs' | 'sm' | 'md' | 'lg';

interface SeatGridProps {
  children: ReactNode;
  label?: string;
  minWidth?: SeatGridMinWidth;
  gap?: SeatGridGap;
  className?: string;
}

export type { SeatGridGap, SeatGridMinWidth, SeatGridProps };
