/* @layer renderer-components @kind types */
import type { RefCallback } from 'react';
import type { AnchoredPlacement, AnchoredProps } from '../Anchored.type';

interface AnchoredFallbackProps extends Omit<AnchoredProps, 'anchorRef' | 'placement' | 'flip' | 'ref'> {
  nodeRef: RefCallback<HTMLDivElement>;
  place?: AnchoredPlacement;
}

export type { AnchoredFallbackProps };
