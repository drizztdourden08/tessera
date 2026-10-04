/* @layer renderer-components @kind types */
import type { StackedBarOrientation, StackedBarRow } from '../StackedBar.type';

interface StackedBarTrackProps {
  rows: readonly StackedBarRow[];
  sizes: readonly string[];
  orientation: StackedBarOrientation;
  freeTip: string | null;
  summary: string | undefined;
}

export type { StackedBarTrackProps };
