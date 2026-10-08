/* @layer renderer-components @kind logic */
import { DEFAULT_LARGE_STEP, DEFAULT_STEP } from '../ResizeHandle.constants';
import type { ResizeHandleProps } from '../ResizeHandle.type';
import type { ResizeOptions } from './resize-options.type';

const resizeOptionsOf = (props: ResizeHandleProps): ResizeOptions => ({
  ...props,
  orientation: props.orientation ?? 'horizontal',
  edge: props.edge ?? 'start',
  step: props.step ?? DEFAULT_STEP,
  largeStep: props.largeStep ?? DEFAULT_LARGE_STEP,
});

export { resizeOptionsOf };
