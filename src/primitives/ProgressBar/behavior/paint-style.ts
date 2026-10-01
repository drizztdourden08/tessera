/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { ProgressPaint } from '../ProgressBar.type';

const paintStyle = (paint: ProgressPaint, place: CSSProperties): CSSProperties =>
  (paint.color === undefined ? place : ({ ...place, '--progress-fill': paint.color } as CSSProperties));

export { paintStyle };
