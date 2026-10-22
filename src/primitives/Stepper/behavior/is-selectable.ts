/* @layer renderer-components @kind util */
import type { StepperProps } from '../Stepper.type';

const isSelectable = (props: Pick<StepperProps, 'canSelect' | 'selectMode'>, index: number, current: number, id: string): boolean =>
  index !== current && (props.canSelect?.(id) ?? props.selectMode === 'toggle');

export { isSelectable };
