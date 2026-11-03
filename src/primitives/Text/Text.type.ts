/* @layer renderer-components @kind types */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import type { TextTone } from '../TextElement/TextElement.type';
import type { Typesetting } from './behavior/text-style.type';

type TextVariant = 'body' | 'label' | 'title' | 'subtitle' | 'caption' | 'overline';

type TextSize = 'md' | 'lead';

type TextFont = 'title';

type TextLeading = '16';

interface TextProps extends HTMLAttributes<HTMLElement>, Typesetting {
  as?: ElementType;
  variant?: TextVariant;
  size?: TextSize;
  font?: TextFont;
  leading?: TextLeading;
  tone?: TextTone | 'faint';
  mono?: boolean;
  numeric?: boolean;
  smartTimes?: boolean;
  clamp?: number;
  children?: ReactNode;
}

export type { TextFont, TextLeading, TextProps, TextSize, TextVariant };
