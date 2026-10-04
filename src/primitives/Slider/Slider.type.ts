/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintReport } from '../hint/hint.type';
import type { ScaleLabelSource } from '../ScaleLabels/ScaleLabels.type';

type SliderPair = readonly [number, number];

interface SliderCommonProps {
  min?: number;
  max?: number;
  step?: number;
  keyStep?: number;
  stops?: readonly string[];
  labels?: ScaleLabelSource;
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
  input?: boolean;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

interface SliderRangeProps extends SliderCommonProps {
  range: true;
  input?: never;
  value?: SliderPair;
  defaultValue?: SliderPair;
  onChange?: (value: [number, number]) => void;
}

type SliderProps = SliderSingleProps | SliderRangeProps;

export type {
  SliderPair,
  SliderProps,
  SliderRangeProps,
  SliderSingleProps,
};
