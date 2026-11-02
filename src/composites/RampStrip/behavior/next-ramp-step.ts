/* @layer renderer-components @kind logic */
import { rovingIndex } from '../../../primitives/field-control/roving-index';
import { RAMP_STEPS } from '../RampStrip.constants';
import type { RampStep } from '../RampStrip.type';

const nextRampStep = (key: string, current: number, steps: readonly RampStep[]): number | null =>
  rovingIndex(key, current, steps.map((step) => step.disabled !== true), RAMP_STEPS);

export { nextRampStep };
