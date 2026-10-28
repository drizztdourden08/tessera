/* @layer renderer-components @kind types */
import type { Ref } from 'react';
import type { ScaleOrientation } from '../../ScaleLabels/ScaleLabels.type';
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
  mixedText?: string;
  onTop?: boolean;
  hot?: boolean;
  orientation?: ScaleOrientation;
  onValue: (value: number) => void;
  onFocus?: () => void;
  ref?: Ref<HTMLInputElement>;
}

export type { SliderThumbProps };
