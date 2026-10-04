/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { StepperTone } from '../Stepper.type';
import { STEPPER_TONES } from './stepper-tones.constants';

const toneStyle = (tone: StepperTone | undefined, prefix: string): CSSProperties => {
  if (tone === undefined) return {};
  const ink = STEPPER_TONES[tone];
  return { [`${prefix}tone`]: ink.tone, [`${prefix}on-tone`]: ink.on };
};

export { toneStyle };
