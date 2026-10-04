/* @layer renderer-components @kind types */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import type { TextTone } from '../TextElement/TextElement.type';
import type { Typesetting } from './behavior/text-style.type';

type TextVariant = 'body' | 'label' | 'title' | 'subtitle' | 'caption' | 'overline';

interface TextProps extends HTMLAttributes<HTMLElement>, Typesetting {
  as?: ElementType;
  variant?: TextVariant;
  tone?: TextTone;
  mono?: boolean;
  numeric?: boolean;
  children?: ReactNode;
}

export type { TextProps, TextVariant };
