/* @layer renderer-components @kind types */
import type { TextTone } from '../../TextElement/TextElement.type';
import type { TextFont, TextLeading, TextSize, TextVariant } from '../Text.type';

interface TextClassParams {
  variant?: TextVariant;
  size?: TextSize;
  font?: TextFont;
  leading?: TextLeading;
  tone?: TextTone | 'faint';
  mono?: boolean;
  numeric?: boolean;
  clamp?: boolean;
  className?: string;
}

export type { TextClassParams };
