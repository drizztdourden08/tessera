/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';
import type { SpaceToken } from '../Flex';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  minColWidth?: number;
  gap?: SpaceToken;
  children?: ReactNode;
}

export type { GridProps };
