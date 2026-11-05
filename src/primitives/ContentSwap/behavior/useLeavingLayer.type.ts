/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ContentSwapLayer } from '../ContentSwap.type';

interface LeavingLayer {
  leaving: ContentSwapLayer | null;
  entering: boolean;
  finish: () => void;
  outRef: RefObject<HTMLElement | null>;
}

export type { LeavingLayer };
