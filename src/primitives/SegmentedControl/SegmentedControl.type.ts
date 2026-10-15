/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode, RefObject } from 'react';
import type { ControlName } from '../field-control/control-name.type';
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintHandlers, HintReport } from '../hint/hint.type';
import type { IconName } from '../Icon/Icon.type';

interface SegmentOptionBase<T extends string> {
  value: T;
  title?: string;
  hint?: Hint;
  disabled?: boolean | string;
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
  className?: string;
}

interface SegmentButtonProps<T extends string> {
  option: SegmentOption<T>;
  active: boolean;
  disabled: boolean;
  reason?: string;
  stop: boolean;
  size: ControlSize;
  handlers: HintHandlers;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

interface SegmentKeysInput<T extends string> {
  trackRef: RefObject<HTMLElement | null>;
  options: readonly SegmentOption<T>[];
  enabled: readonly boolean[];
  value: T;
  pick: (value: T) => void;
}

interface SegmentKeys {
  stop: number;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type {
  SegmentButtonProps,
  SegmentKeys,
  SegmentKeysInput,
  SegmentIconOption,
  SegmentOption,
  SegmentTextOption,
  SegmentedControlProps,
};
