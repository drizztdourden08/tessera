/* @layer renderer-components @kind util */
import { Children } from 'react';
import type { ReactNode } from 'react';

const plainLabel = (children: ReactNode): boolean =>
  Children.toArray(children).every((child) => typeof child === 'string' || typeof child === 'number');

export { plainLabel };
