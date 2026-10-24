/* @layer stories @kind types */
import type { IconName } from '../../../src/primitives';

interface DockToolSpec {
  id: string;
  label: string;
  icon: IconName;
}

interface DockToolbarSpec {
  id: string;
  label: string;
  side: 'top' | 'left' | 'right' | 'bottom';
  tools: readonly DockToolSpec[];
}

export type { DockToolbarSpec };
