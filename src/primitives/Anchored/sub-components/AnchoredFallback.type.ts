/* @layer renderer-components @kind types */
import type { RefCallback, RefObject } from 'react';
import type { AnchoredPlacement, AnchoredProps } from '../Anchored.type';

interface AnchoredFallbackProps extends Omit<AnchoredProps, 'anchorRef' | 'placement' | 'flip' | 'ref'> {
  nodeRef: RefCallback<HTMLDivElement>;
  anchorRef?: RefObject<HTMLElement | null>;
  fit?: boolean;
  place?: AnchoredPlacement;
}

export type { AnchoredFallbackProps };
