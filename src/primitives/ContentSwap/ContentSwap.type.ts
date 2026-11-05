/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ContentSwapEffect = 'fade' | 'slide' | 'scale';

type ContentSwapDirection = 'forward' | 'back';

interface ContentSwapProps {
  swapKey: string | number;
  children?: ReactNode;
  effect?: ContentSwapEffect;
  direction?: ContentSwapDirection;
  className?: string;
}

interface ContentSwapLayer {
  key: string | number;
  node: ReactNode;
}

export type { ContentSwapDirection, ContentSwapEffect, ContentSwapLayer, ContentSwapProps };
