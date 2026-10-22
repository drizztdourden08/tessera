/* @layer renderer-components @kind util */
import type { StepperProps } from '../Stepper.type';

const flag = (on: boolean): '' | undefined => (on ? '' : undefined);

const labelAt = (props: Pick<StepperProps, 'orientation' | 'labelPlacement'>): 'above' | 'hidden' | undefined => {
  if (props.labelPlacement === 'hidden') return 'hidden';
  return props.orientation !== 'vertical' && props.labelPlacement === 'above' ? 'above' : undefined;
};

const rootAttrs = (props: Pick<StepperProps, 'orientation' | 'labelPlacement' | 'mediaPlacement' | 'dotVariant' | 'scroll'>, hasMedia: boolean) => ({
  'data-label-at': labelAt(props),
  'data-media-at': hasMedia && props.mediaPlacement === 'below' ? 'below' : undefined,
  'data-dot': props.dotVariant === 'ring' ? 'ring' : undefined,
  'data-media': flag(hasMedia),
  'data-scroll': flag(props.scroll === true),
});

export { rootAttrs };
