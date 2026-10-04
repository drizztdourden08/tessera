/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { StackedBarOrientation } from '../StackedBar.type';

const barTemplate = (sizes: readonly string[], orientation: StackedBarOrientation): CSSProperties => (orientation === 'vertical'
  ? { gridTemplateRows: [...sizes].reverse().join(' ') }
  : { gridTemplateColumns: sizes.join(' ') });

export { barTemplate };
