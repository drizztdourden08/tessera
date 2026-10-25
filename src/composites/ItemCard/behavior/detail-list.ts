/* @layer renderer-components @kind util */
import { Children } from 'react';
import type { ReactNode } from 'react';

const detailList = (details: ReactNode | readonly ReactNode[]): ReactNode[] => Children.toArray(details);

export { detailList };
