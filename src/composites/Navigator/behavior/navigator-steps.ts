/* @layer renderer-components @kind logic */
import { BIG_STEP, STEPS_ACROSS } from '../Navigator.constants';
import type { NavigatorProps, NavigatorSteps } from '../Navigator.type';

const navigatorSteps = (props: Pick<NavigatorProps, 'surface' | 'step' | 'bigStep'>): NavigatorSteps => {
  const { surface, step, bigStep } = props;
  const unit = step ?? Math.max(surface.width, surface.height) / STEPS_ACROSS;
  return { unit, bigUnit: bigStep ?? unit * BIG_STEP };
};

export { navigatorSteps };
