/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';
import type { SpaceToken } from '../Flex';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  minColWidth?: number;
  gap?: SpaceToken;
  dense?: boolean;
  children?: ReactNode;
}

type GridSpan = 1 | 2 | 'full';

interface GridCellProps extends HTMLAttributes<HTMLDivElement> {
  span?: GridSpan;
  children?: ReactNode;
}

export type { GridCellProps, GridProps, GridSpan };
