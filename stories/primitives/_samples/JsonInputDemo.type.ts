/* @layer stories @kind types */
import type { JsonInputProps } from '../../../src/primitives';

interface JsonInputDemoProps extends Omit<JsonInputProps, 'value' | 'onChange'> {
  start: unknown;
}

export type { JsonInputDemoProps };
