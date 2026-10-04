/* @layer renderer-components @kind types */
import type { StackedBarRow } from '../StackedBar.type';

interface StackedBarTrackProps {
  rows: readonly StackedBarRow[];
  columns: string;
  freeTip: string | null;
  summary: string | undefined;
}

export type { StackedBarTrackProps };
