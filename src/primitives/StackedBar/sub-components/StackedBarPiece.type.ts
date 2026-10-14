/* @layer renderer-components @kind types */
import type { StackedBarColor } from '../StackedBar.type';

interface StackedBarPieceProps {
  color: StackedBarColor | 'free';
  tip: string;
  description?: string;
}

export type { StackedBarPieceProps };
