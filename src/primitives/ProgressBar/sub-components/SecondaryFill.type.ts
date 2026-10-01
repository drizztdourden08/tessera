/* @layer renderer-components @kind types */
import type { ProgressPaint, ProgressTone } from '../ProgressBar.type';

interface SecondaryFillProps {
  value: number | undefined;
  max: number;
  tone: ProgressTone | undefined;
  under: ProgressPaint | undefined;
}

export type { SecondaryFillProps };
