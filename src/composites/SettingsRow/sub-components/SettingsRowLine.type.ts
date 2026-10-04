/* @layer renderer-components @kind types */
import type { Hint } from '../../../primitives/hint/hint.type';

interface SettingsRowLineProps {
  resting: string;
  hints: readonly Hint[];
  pointed?: Hint;
}

export type { SettingsRowLineProps };
