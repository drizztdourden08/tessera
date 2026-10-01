/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { Hint, HintHandlers, HintReport } from '../hint/hint.type';
import type { IconName } from '../Icon/Icon.type';

type SegmentedSize = 'xs' | 'md';

interface SegmentOptionBase<T extends string> {
  value: T;
  title?: string;
  hint?: Hint;
  disabled?: boolean;
}

interface SegmentTextOption<T extends string> extends SegmentOptionBase<T> {
  label: ReactNode;
  icon?: undefined;
}

interface SegmentIconOption<T extends string> extends SegmentOptionBase<T> {
  icon: IconName;
  hint: Hint;
  label?: undefined;
}

type SegmentOption<T extends string = string> = SegmentTextOption<T> | SegmentIconOption<T>;

interface SegmentedControlProps<T extends string = string> {
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
  onDeselect?: () => void;
  onHint?: HintReport;
  label?: string;
  description?: string;
  size?: SegmentedSize;
  disabled?: boolean;
  'aria-label'?: string;
}

interface SegmentButtonProps<T extends string> {
  option: SegmentOption<T>;
  active: boolean;
  disabled: boolean;
  size: SegmentedSize;
  handlers: HintHandlers;
  onSelect: () => void;
}

export type {
  SegmentButtonProps,
  SegmentIconOption,
  SegmentOption,
  SegmentTextOption,
  SegmentedControlProps,
  SegmentedSize,
};
