/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { FitBox } from './fit-in-view.type';

interface UseViewFitParams {
  active: boolean;
  nodeRef: RefObject<HTMLElement | null>;
  anchorBox: () => FitBox | null;
  boundaryRef?: RefObject<HTMLElement | null>;
}

export type { UseViewFitParams };
