/* @layer renderer-components @kind types */
import type { ProgressTone } from '../ProgressBar.type';

interface SecondaryFillProps {
  value: number | undefined;
  max: number;
  tone: ProgressTone;
  faded: boolean;
}

export type { SecondaryFillProps };
