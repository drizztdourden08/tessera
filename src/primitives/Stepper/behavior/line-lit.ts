/* @layer renderer-components @kind util */
import type { StepperStatus, StepperStep } from '../Stepper.type';

const lit = (status: StepperStatus): boolean => status === 'done' || status === 'current';

const lineLit = (status: StepperStatus, next: StepperStep | undefined, nextStatus: StepperStatus | undefined): boolean => {
  if (next?.state !== undefined && nextStatus !== undefined) return lit(nextStatus);
  return status === 'done' || status === 'error';
};

export { lineLit };
