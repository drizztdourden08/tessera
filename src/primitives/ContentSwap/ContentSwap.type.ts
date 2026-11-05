/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ContentSwapEffect = 'fade' | 'slide' | 'scale' | 'reflow';

type ContentSwapSequence = 'overlap' | 'out-in';

type ContentSwapDirection = 'forward' | 'back';

interface ContentSwapProps {
  swapKey: string | number;
  children?: ReactNode;
  effect?: ContentSwapEffect;
  direction?: ContentSwapDirection;
  sequence?: ContentSwapSequence;
  className?: string;
}

interface ContentSwapLayer {
  key: string | number;
  node: ReactNode;
}

export type { ContentSwapDirection, ContentSwapEffect, ContentSwapLayer, ContentSwapProps, ContentSwapSequence };
