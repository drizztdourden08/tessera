/* @layer renderer-components @kind types */
import type { Ref } from 'react';
import type { SliderScale } from '../behavior/slider-scale.type';

interface SliderThumbProps {
  value: number;
  scale: SliderScale;
  disabled: boolean;
  label?: string;
  id?: string;
  name?: string;
  keyStep?: number;
  onTop?: boolean;
  onValue: (value: number) => void;
  onFocus?: () => void;
  ref?: Ref<HTMLInputElement>;
}

export type { SliderThumbProps };
