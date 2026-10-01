/* @layer renderer-components @kind types */
import type { Hint } from '../hint/hint.type';

interface HintLineProps {
  hint?: Hint | null;
  idle?: string;
  lines?: 1 | 2;
  className?: string;
}

export type { HintLineProps };
