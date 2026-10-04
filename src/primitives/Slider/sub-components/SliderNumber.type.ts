/* @layer renderer-components @kind types */
import type { ValueScale } from '../../value-rule/value-rule.type';

interface SliderNumberProps {
  value: number;
  scale: ValueScale;
  disabled: boolean;
  label?: string;
  onValue: (value: number) => void;
}

export type { SliderNumberProps };
