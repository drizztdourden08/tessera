/* @layer renderer-components @kind types */
import type { StackedBarColor } from '../StackedBar/StackedBar.type';

type SegmentedBarTone = StackedBarColor | 'track';

interface SegmentedBarSegment {
  tone: SegmentedBarTone;
  label: string;
}

interface SegmentedBarProps {
  segments: readonly SegmentedBarSegment[];
  label: string;
  onClick?: () => void;
  className?: string;
}

export type { SegmentedBarProps, SegmentedBarSegment, SegmentedBarTone };
