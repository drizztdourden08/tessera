/* @layer renderer-components @kind types */
import type { IconName } from '../../primitives/Icon';

interface DropPopZoneProps {
  stays?: boolean;
  label?: string;
  icon?: IconName;
  tone?: 'pop' | 'basket';
}

export type { DropPopZoneProps };
