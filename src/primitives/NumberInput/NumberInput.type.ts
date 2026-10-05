/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';
import type { ControlSize } from '../field-control/field-control.type';
import type { InputAdornment } from '../field-control/input-adornment.type';
import type { GlyphName } from '../Glyph';

type NumberInputButtons = 'stacked' | 'sides';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  onChange?: (value: number) => void;
  buttons?: NumberInputButtons;
  sizeToContent?: boolean;
  invalid?: boolean;
  size?: ControlSize;
  start?: InputAdornment;
  end?: InputAdornment;
}

interface StepBounds {
  step: unknown;
  min: unknown;
  max: unknown;
}

interface NumberInputButtonProps {
  className: string;
  glyph: GlyphName;
  glyphSize: number;
  stroke: number;
  label: string;
  disabled: boolean;
  onStep: () => void;
}

interface NumberInputClassParams {
  size: ControlSize;
  sides: boolean;
  auto: boolean;
  disabled: boolean;
  className?: string;
}

interface NumberInputStepsProps {
  at: 'stack' | 'start' | 'end';
  size: ControlSize;
  disabled: boolean;
  onStep: (dir: 1 | -1) => void;
}

export type { NumberInputButtonProps, NumberInputClassParams, NumberInputStepsProps, NumberInputButtons, NumberInputProps, StepBounds };
