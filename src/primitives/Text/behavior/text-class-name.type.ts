/* @layer renderer-components @kind types */
import type { TextTone } from '../../TextElement/TextElement.type';
import type { TextFont, TextSize, TextVariant } from '../Text.type';

interface TextClassParams {
  variant?: TextVariant;
  size?: TextSize;
  font?: TextFont;
  tone?: TextTone | 'faint';
  mono?: boolean;
  numeric?: boolean;
  className?: string;
}

export type { TextClassParams };
