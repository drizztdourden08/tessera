/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlName } from '../field-control/control-name.type';
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintHandlers, HintReport } from '../hint/hint.type';
import type { IconName } from '../Icon/Icon.type';

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

interface SegmentedControlProps<T extends string = string> extends ControlName {
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
  onDeselect?: () => void;
  onHint?: HintReport;
  label?: string;
  description?: string;
  size?: ControlSize;
  disabled?: boolean;
}

interface SegmentButtonProps<T extends string> {
  option: SegmentOption<T>;
  active: boolean;
  disabled: boolean;
  size: ControlSize;
  handlers: HintHandlers;
  onSelect: () => void;
}

export type {
  SegmentButtonProps,
  SegmentIconOption,
  SegmentOption,
  SegmentTextOption,
  SegmentedControlProps,
};
