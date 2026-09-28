/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SegmentOption<T extends string = string> {
  value: T;
  label: ReactNode;
  title?: string;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string = string> {
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
  onDeselect?: () => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export type {
  SegmentOption,
  SegmentedControlProps,
};
