/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';
import type { CalloutTone } from '../Callout/Callout.type';

type SpeechBubblePointer = 'top' | 'bottom' | 'left' | 'right' | 'none';

interface SpeechBubbleProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'> {
  tone?: CalloutTone;
  pointer?: SpeechBubblePointer;
  pointerOffset?: number;
  maxWidth?: number;
  className?: string;
  children?: ReactNode;
}

export type { SpeechBubblePointer, SpeechBubbleProps };
