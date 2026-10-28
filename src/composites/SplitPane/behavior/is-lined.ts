/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import type { SplitOrientation } from '../SplitPane.type';

const isLined = (orientation: SplitOrientation, summary: ReactNode, header: ReactNode): boolean =>
  orientation === 'vertical' && (summary !== undefined || header !== undefined);

export { isLined };
