/* @layer renderer-components @kind types */
import type { ContentSwapLayer } from '../ContentSwap.type';

interface LeavingLayer {
  leaving: ContentSwapLayer | null;
  entering: boolean;
  finish: () => void;
}

export type { LeavingLayer };
