/* @layer renderer-components @kind hook */
import { useId } from 'react';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { StepperStatus } from '../Stepper.type';

const useStepNote = (status: StepperStatus): { id?: string; text?: string } => {
  const { stepper } = useTesseraStrings();
  const id = useId();
  if (status === 'done') return { id, text: stepper.done };
  return status === 'error' ? { id, text: stepper.needsAttention } : {};
};

export { useStepNote };
