/* @layer renderer-components @kind types */
import type { PositionAxis } from '../PositionInput.type';

interface AxisDraftParams {
  value: number;
  axis: PositionAxis;
  onCommit: (next: number) => void;
}

export type { AxisDraftParams };
