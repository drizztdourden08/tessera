/* @layer renderer-components @kind util */
import type { ProgressBarProps, ProgressPart } from '../ProgressBar.type';

const partsOf = (props: ProgressBarProps): readonly ProgressPart[] =>
  (props.parts ?? [{ value: props.value, tone: props.tone ?? 'primary', label: props.label ?? '' }]);

export { partsOf };
