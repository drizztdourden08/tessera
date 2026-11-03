/* @layer stories @kind types */
import type { ControlSize } from '../../../src/primitives';

type NumberFieldArgs = {
  label: string;
  suffix: string;
  min: number;
  max: number;
  step: number;
  scrub: boolean;
  wheel: boolean;
  disabled: boolean;
  mixed: boolean;
  size: ControlSize;
};

interface StatefulNumberFieldProps extends Partial<NumberFieldArgs> {
  initial: number;
  ladder?: readonly number[];
  presets?: readonly (number | { value: number; label: string })[];
  fineStep?: number;
  buttons?: 'sides' | 'stacked';
  stepLabels?: readonly [string, string];
}

export type { NumberFieldArgs, StatefulNumberFieldProps };
