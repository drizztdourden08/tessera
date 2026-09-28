/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

interface QuoteMarkProps {
  side: 'open' | 'close';
}

interface QuoteProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode;
  cite?: string;
  inline?: boolean;
}

interface QuoteLayout {
  lines: number;
  textWidth: number;
  start: number;
  room: number;
  slack: number;
}

export type { QuoteLayout, QuoteMarkProps, QuoteProps };
