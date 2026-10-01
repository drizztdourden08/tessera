/* @layer stories @kind data */
import type { ControlSize } from '../../src/primitives';

const CONTROL_SIZES: readonly ControlSize[] = ['md', 'sm'];

const SIZE_ARG = {
  control: 'select',
  options: [...CONTROL_SIZES],
  description: 'md is the standard control height, sm the compact one.',
} as const;

export { CONTROL_SIZES, SIZE_ARG };
