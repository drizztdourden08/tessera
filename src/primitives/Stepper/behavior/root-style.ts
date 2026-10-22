/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { StepperProps } from '../Stepper.type';
import { STEPPER_MEDIA_SIZES, STEPPER_SIZES, STEPPER_STEP_WIDTHS } from './stepper-sizes.constants';
import { toneStyle } from './tone-style';

const sizeStyle = (size: StepperProps['size']) => {
  if (size === undefined) return {};
  const look = STEPPER_SIZES[size];
  return { '--stepper-dot': look.dot, '--stepper-digit': look.digit, '--stepper-gap': look.gap, '--stepper-gap-min': look.gapMin };
};

const rootStyle = (props: Pick<StepperProps, 'tone' | 'stepWidth' | 'mediaSize' | 'labelLines' | 'size'>): CSSProperties | undefined => {
  const { tone, stepWidth, mediaSize, labelLines, size } = props;
  const style = {
    ...toneStyle(tone, '--stepper-'),
    ...sizeStyle(size),
    ...(stepWidth === undefined ? {} : { '--stepper-step-w': STEPPER_STEP_WIDTHS[stepWidth] }),
    ...(mediaSize === undefined ? {} : { '--stepper-media-h': STEPPER_MEDIA_SIZES[mediaSize] }),
    ...(labelLines === undefined ? {} : { '--stepper-label-lines': labelLines }),
  } as CSSProperties;
  return Object.keys(style).length === 0 ? undefined : style;
};

export { rootStyle };
