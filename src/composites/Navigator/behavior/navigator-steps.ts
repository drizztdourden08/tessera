/* @layer renderer-components @kind logic */
import { BIG_STEP, STEPS_ACROSS } from '../Navigator.constants';
import type { NavigatorProps, NavigatorSteps } from '../Navigator.type';
import { axisStep } from './axis-step';

const navigatorSteps = (props: Pick<NavigatorProps, 'surface' | 'step' | 'bigStep'>): NavigatorSteps => {
  const { surface, step, bigStep } = props;
  const unit = axisStep(step ?? Math.max(surface.width, surface.height) / STEPS_ACROSS);
  return { unit, bigUnit: bigStep === undefined ? { x: unit.x * BIG_STEP, y: unit.y * BIG_STEP } : axisStep(bigStep) };
};

export { navigatorSteps };
