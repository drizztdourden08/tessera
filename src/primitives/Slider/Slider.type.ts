/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintReport } from '../hint/hint.type';

type SliderLabelEntry = readonly [value: number, label: ReactNode];

type SliderLabels = string | readonly SliderLabelEntry[] | ((value: number) => ReactNode);

type SliderPair = readonly [number, number];

interface SliderCommonProps {
  min?: number;
  max?: number;
  step?: number;
  keyStep?: number;
  stops?: readonly string[];
  labels?: SliderLabels;
  label?: string;
  description?: string;
  disabled?: boolean;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  size?: ControlSize;
  hint?: Hint;
  onHint?: HintReport;
  id?: string;
  name?: string;
  className?: string;
  'aria-label'?: string;
}

interface SliderSingleProps extends SliderCommonProps {
  range?: false;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  mute?: boolean;
  onMuteToggle?: () => void;
}

interface SliderRangeProps extends SliderCommonProps {
  range: true;
  value?: SliderPair;
  defaultValue?: SliderPair;
  onChange?: (value: [number, number]) => void;
  mute?: never;
  onMuteToggle?: never;
}

type SliderProps = SliderSingleProps | SliderRangeProps;

export type {
  SliderLabelEntry,
  SliderLabels,
  SliderPair,
  SliderProps,
  SliderRangeProps,
  SliderSingleProps,
};
