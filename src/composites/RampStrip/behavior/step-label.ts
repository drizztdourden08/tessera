/* @layer renderer-components @kind logic */
import type { RampStep } from '../RampStrip.type';

const stepLabel = (step: RampStep): string => step.label ?? step.color;

export { stepLabel };
