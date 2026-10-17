/* @layer renderer-components @kind types */
import type { CSSProperties } from 'react';
import type { TextTone } from '../../../primitives/TextElement';

interface LogInk {
  tone?: TextTone;
  className?: string;
  style?: CSSProperties;
}

export type { LogInk };
