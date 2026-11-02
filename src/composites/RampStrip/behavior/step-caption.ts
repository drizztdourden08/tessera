/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';
import type { RampStep } from '../RampStrip.type';

const stepCaption = (step: RampStep, index: number, numbered: boolean): ReactNode => {
  if (step.caption !== undefined) return step.caption;
  return numbered ? String(index + 1) : undefined;
};

export { stepCaption };
