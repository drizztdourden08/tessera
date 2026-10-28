/* @layer renderer-components @kind util */
import type { WheelDelta, WheelStep } from './wheel-step.type';

const wheelStepOf = (event: WheelDelta): WheelStep | undefined => {
  const delta = event.deltaY || event.deltaX || 0;
  if (delta === 0) return undefined;
  return { direction: delta < 0 ? 1 : -1, fine: event.shiftKey };
};

export { wheelStepOf };
