/* @layer stories @kind types */
import type { PathInputProps } from '../../../src/composites';

interface PathInputDemoProps extends Omit<PathInputProps, 'value' | 'onChange' | 'onBrowse' | 'onReveal'> {
  start: string | null;
  label?: string;
  hint?: string;
  browse?: boolean;
  reveal?: boolean;
}

export type { PathInputDemoProps };
