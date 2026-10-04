/* @layer renderer-components @kind types */
import type { StackedBarColor } from '../StackedBar.type';

interface StackedBarPieceProps {
  color: StackedBarColor | 'free';
  tip: string;
}

export type { StackedBarPieceProps };
