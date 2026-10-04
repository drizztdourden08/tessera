/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { StepperTone } from '../Stepper.type';
import { STEPPER_TONES } from './stepper-tones.constants';
import { toneStyle } from './tone-style';

const itemStyle = (wave: number | undefined, tone: StepperTone | undefined, lineTone: StepperTone | undefined): CSSProperties | undefined => {
  const style = {
    ...(wave === undefined ? {} : { '--stepper-wave': wave }),
    ...toneStyle(tone, '--stepper-step-'),
    ...(lineTone === undefined ? {} : { '--stepper-line-tone': STEPPER_TONES[lineTone].tone }),
  } as CSSProperties;
  return Object.keys(style).length === 0 ? undefined : style;
};

export { itemStyle };
