/* @layer renderer-components @kind types */
import type { SliderLabelPoint } from '../SliderLabels.type';

interface RuleLabels {
  points: SliderLabelPoint[];
  error: string | null;
}

export type { RuleLabels };
