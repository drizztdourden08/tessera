/* @layer renderer-components @kind types */
import type { ReactNode, RefCallback, RefObject } from 'react';
import type { TooltipProps } from '../Tooltip.type';

interface TooltipBubbleProps {
  atPointer: boolean;
  attach: RefCallback<HTMLDivElement>;
  bubbleRef: RefObject<HTMLDivElement | null>;
  anchorRef: RefObject<HTMLSpanElement | null>;
  id: string;
  placement: NonNullable<TooltipProps['placement']>;
  children: ReactNode;
}

export type { TooltipBubbleProps };
