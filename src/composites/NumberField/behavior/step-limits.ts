/* @layer renderer-components @kind util */
import type { StepLimitsParams } from '../NumberField.type';

const stepLimits = ({ value, min, max, ladder }: StepLimitsParams): readonly [boolean, boolean] => {
  const stops = ladder ?? [];
  const low = min ?? (stops.length > 0 ? Math.min(...stops) : undefined);
  const high = max ?? (stops.length > 0 ? Math.max(...stops) : undefined);
  return [low !== undefined && value <= low, high !== undefined && value >= high];
};

export { stepLimits };
