/* @layer renderer-components @kind types */
import type { ViewOption } from '../GroupControl';

interface GroupBarProps {
  options: readonly ViewOption[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  maxLevels?: number;
  className?: string;
}

export type { GroupBarProps };
