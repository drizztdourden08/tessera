/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';

const letterDelay = (index: number, stagger: number): CSSProperties =>
  ({ '--emphasis-delay': `${index * stagger}ms` }) as CSSProperties;

export { letterDelay };
