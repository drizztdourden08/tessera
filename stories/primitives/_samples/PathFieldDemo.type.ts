/* @layer stories @kind types */
import type { PathFieldProps } from '../../../src/primitives';

interface PathFieldDemoProps extends Omit<PathFieldProps, 'value' | 'onChange' | 'onBrowse' | 'onReveal'> {
  start: string | null;
  label?: string;
  hint?: string;
  browse?: boolean;
  reveal?: boolean;
}

export type { PathFieldDemoProps };
