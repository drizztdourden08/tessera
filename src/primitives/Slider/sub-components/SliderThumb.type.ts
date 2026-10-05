/* @layer renderer-components @kind types */
import type { Ref } from 'react';
import type { ValueScale } from '../../value-rule/value-rule.type';

interface SliderThumbProps {
  value: number;
  scale: ValueScale;
  disabled: boolean;
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  id?: string;
  name?: string;
  keyStep?: number;
  onTop?: boolean;
  hot?: boolean;
  onValue: (value: number) => void;
  onFocus?: () => void;
  ref?: Ref<HTMLInputElement>;
}

export type { SliderThumbProps };
