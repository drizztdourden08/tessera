/* @layer stories @kind hook */
import { useEffect, useState } from 'react';
import type { CalibrationStepAction } from './CalibrationStep.type';
import { triggerAt } from './controller-motion';
import { useAnimationTime } from './use-animation-time';

type TriggerStep = 'rest' | 'press' | 'review';

const REST_VALUE = 0.03;
const MIN_TRAVEL = 0.5;

const useTriggerCalibrationDemo = () => {
  const [step, setStep] = useState<TriggerStep>('rest');
  const [base, setBase] = useState(0);
  const [peak, setPeak] = useState(0);
  const [deadzone, setDeadzone] = useState(0.05);
  const seconds = useAnimationTime();
  const value = step === 'rest' ? REST_VALUE : triggerAt(seconds);

  useEffect(() => {
    if (step === 'press') setPeak((current) => Math.max(current, value));
  }, [step, value]);

  const restart = () => {
    setStep('rest');
    setPeak(0);
  };

  const recordRest = () => {
    setBase(value);
    setPeak(value);
    setStep('press');
  };

  const actions: Record<TriggerStep, CalibrationStepAction> = {
    rest: { label: 'Record rest', onClick: recordRest },
    press: { label: 'Next', disabled: peak - base < MIN_TRAVEL, onClick: () => setStep('review') },
    review: { label: 'Save', onClick: restart },
  };

  const readout = `value ${value.toFixed(2)}  rest ${base.toFixed(2)}  peak ${peak.toFixed(2)}`;

  return { step, value, peak, deadzone, setDeadzone, readout, action: actions[step], restart };
};

export { useTriggerCalibrationDemo };
export type { TriggerStep };
