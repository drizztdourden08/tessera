/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import { timesBetweenDigits } from './times-between-digits';

const smartChildren = (children: ReactNode, smart: boolean | undefined): ReactNode => {
  if (smart !== true) return children;
  if (typeof children === 'string') return timesBetweenDigits(children);
  if (Array.isArray(children)) return children.map((child: ReactNode) => (typeof child === 'string' ? timesBetweenDigits(child) : child));
  return children;
};

export { smartChildren };
