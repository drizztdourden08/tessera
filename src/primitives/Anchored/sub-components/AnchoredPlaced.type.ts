/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { AnchoredPlacement, AnchoredProps } from '../Anchored.type';
import type { AnchoredFallbackProps } from './AnchoredFallback.type';

interface AnchoredPlacedProps extends Omit<AnchoredFallbackProps, 'anchorBox' | 'boundaryRef' | 'fit' | 'place'> {
  anchor: RefObject<HTMLElement | null>;
  anchorRect?: AnchoredProps['anchorRect'];
  boundary?: AnchoredProps['boundary'];
  placement: AnchoredPlacement;
  flip: boolean;
  popupRef: RefObject<HTMLElement | null>;
}

export type { AnchoredPlacedProps };
