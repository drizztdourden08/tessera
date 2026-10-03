/* @layer renderer-components @kind types */
import type { Hint } from '../../../primitives/hint/hint.type';

interface SettingsRowTextProps {
  title: string;
  description?: string;
  hintLine: boolean;
  hint?: string;
  current?: Hint;
}

export type { SettingsRowTextProps };
