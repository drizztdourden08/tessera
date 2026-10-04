/* @layer stories @kind types */
import type { NamedRangeProps, SetPickerProps } from '../../../src/primitives';

interface NamedRangeDemoProps extends Partial<Omit<NamedRangeProps, 'value' | 'onChange'>> {
  start: number;
}

interface SetPickerDemoProps extends Partial<Omit<SetPickerProps, 'value' | 'onChange'>> {
  start?: readonly string[];
}

export type { NamedRangeDemoProps, SetPickerDemoProps };
