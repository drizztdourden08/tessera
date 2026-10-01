/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintReport } from '../hint/hint.type';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  mute?: boolean;
  onMuteToggle?: () => void;
  size?: ControlSize;
  hint?: Hint;
  onHint?: HintReport;
  'aria-label'?: string;
}

export type {
  SliderProps,
};
