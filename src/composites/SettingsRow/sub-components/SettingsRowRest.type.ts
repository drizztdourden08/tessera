/* @layer renderer-components @kind types */
import type { Hint } from '../../../primitives/hint/hint.type';

interface SettingsRowRestProps {
  hints: readonly Hint[];
  current?: Hint;
}

export type { SettingsRowRestProps };
