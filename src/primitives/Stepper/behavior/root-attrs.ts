/* @layer renderer-components @kind util */
import type { StepperProps } from '../Stepper.type';

const flag = (on: boolean): '' | undefined => (on ? '' : undefined);

const rootAttrs = (props: Pick<StepperProps, 'orientation' | 'labelPlacement' | 'dotVariant' | 'scroll'>, hasMedia: boolean) => ({
  'data-label-at': props.orientation !== 'vertical' && props.labelPlacement === 'above' ? 'above' : undefined,
  'data-dot': props.dotVariant === 'ring' ? 'ring' : undefined,
  'data-media': flag(hasMedia),
  'data-scroll': flag(props.scroll === true),
});

export { rootAttrs };
