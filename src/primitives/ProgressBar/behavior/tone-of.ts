/* @layer renderer-components @kind util */
import type { ProgressPaint, ProgressTone } from '../ProgressBar.type';

const toneOf = (paint: ProgressPaint): ProgressTone | undefined =>
  (paint.color === undefined ? paint.tone ?? 'primary' : undefined);

export { toneOf };
