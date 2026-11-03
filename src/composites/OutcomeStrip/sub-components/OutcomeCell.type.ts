/* @layer renderer-components @kind types */
import type { OutcomeStep } from '../OutcomeStrip.type';

interface OutcomeCellProps {
  step: OutcomeStep;
  index: number;
  tabStop: boolean;
  onPick: (() => void) | undefined;
  onFocusCell: (index: number) => void;
}

export type { OutcomeCellProps };
