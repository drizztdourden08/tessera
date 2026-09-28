/* @layer renderer-components @kind types */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import type { Typesetting } from './behavior/text-style.type';

type TextVariant = 'body' | 'label' | 'title' | 'subtitle' | 'caption';

interface TextProps extends HTMLAttributes<HTMLElement>, Typesetting {
  as?: ElementType;
  variant?: TextVariant;
  children?: ReactNode;
}

export type { TextProps, TextVariant };
