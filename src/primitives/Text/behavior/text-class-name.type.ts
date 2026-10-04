/* @layer renderer-components @kind types */
import type { TextTone } from '../../TextElement/TextElement.type';
import type { TextVariant } from '../Text.type';

interface TextClassParams {
  variant?: TextVariant;
  tone?: TextTone;
  mono?: boolean;
  numeric?: boolean;
  className?: string;
}

export type { TextClassParams };
