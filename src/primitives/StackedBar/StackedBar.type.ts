/* @layer renderer-components @kind types */
import type { StatusTone } from '../Status/Status.type';
import type { TagCategoryColor } from '../Tag/Tag.type';

type StackedBarColor = StatusTone | TagCategoryColor;

type StackedBarSize = 'sm' | 'md';

type StackedBarOrientation = 'horizontal' | 'vertical';

interface StackedBarSegment {
  id: string;
  label: string;
  value: number;
  color?: StackedBarColor;
}

interface StackedBarPart {
  id: string;
  label: string;
  value: number;
  color: StackedBarColor;
  grouped: number;
}

interface StackedBarRow {
  id: string;
  color: StackedBarColor;
  label: string;
  amount: string;
  tip: string;
}

interface StackedBarProps {
  segments: readonly StackedBarSegment[];
  total?: number;
  limit?: number;
  legend?: boolean;
  label?: string;
  size?: StackedBarSize;
  orientation?: StackedBarOrientation;
  height?: number;
  format?: (value: number) => string;
  className?: string;
}

export type {
  StackedBarColor, StackedBarOrientation, StackedBarPart, StackedBarProps, StackedBarRow, StackedBarSegment, StackedBarSize,
};
