/* @layer stories @kind types */
import type { SegmentOption, SegmentSize, TooltipPlacement } from '../../../src/primitives';

interface StatefulSegmentsProps<T extends string> {
  initial: T;
  options: SegmentOption<T>[];
  tooltipPlacement?: TooltipPlacement;
  selectedTone?: 'accent' | 'neutral';
  mixed?: boolean | readonly T[];
  label?: string;
  description?: string;
  disabled?: boolean;
  deselectable?: boolean;
  size?: SegmentSize;
}

export type { StatefulSegmentsProps };
