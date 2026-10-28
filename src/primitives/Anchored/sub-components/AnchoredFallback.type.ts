/* @layer renderer-components @kind types */
import type { RefCallback, RefObject } from 'react';
import type { FitBox } from '../behavior/fit-in-view.type';
import type { AnchoredPlacement, AnchoredProps } from '../Anchored.type';

interface AnchoredFallbackProps extends Omit<AnchoredProps, 'anchorRef' | 'anchorRect' | 'boundary' | 'placement' | 'flip' | 'ref'> {
  nodeRef: RefCallback<HTMLDivElement>;
  anchorBox: () => FitBox | null;
  boundaryRef?: RefObject<HTMLElement | null>;
  fit?: boolean;
  place?: AnchoredPlacement;
}

export type { AnchoredFallbackProps };
