/* @layer renderer-components @kind types */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type SpaceToken = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';

interface FlexProps extends HTMLAttributes<HTMLElement> {
  direction?: 'row' | 'column';
  gap?: SpaceToken;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: boolean;
  inline?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

export type { FlexProps, SpaceToken, FlexAlign, FlexJustify };
