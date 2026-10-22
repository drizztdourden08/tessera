/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { StepperProps } from '../Stepper.type';
import { STEPPER_MEDIA_SIZES, STEPPER_STEP_WIDTHS } from './stepper-sizes.constants';
import { toneStyle } from './tone-style';

const rootStyle = (props: Pick<StepperProps, 'tone' | 'stepWidth' | 'mediaSize' | 'labelLines'>): CSSProperties | undefined => {
  const { tone, stepWidth, mediaSize, labelLines } = props;
  const style = {
    ...toneStyle(tone, '--stepper-'),
    ...(stepWidth === undefined ? {} : { '--stepper-step-w': STEPPER_STEP_WIDTHS[stepWidth] }),
    ...(mediaSize === undefined ? {} : { '--stepper-media-h': STEPPER_MEDIA_SIZES[mediaSize] }),
    ...(labelLines === undefined ? {} : { '--stepper-label-lines': labelLines }),
  } as CSSProperties;
  return Object.keys(style).length === 0 ? undefined : style;
};

export { rootStyle };
