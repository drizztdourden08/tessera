/* @layer renderer-components @kind types */
import type { RefCallback } from 'react';
import type { AnchoredProps } from '../Anchored.type';

interface AnchoredFallbackProps extends Omit<AnchoredProps, 'anchorRef' | 'placement' | 'flip' | 'ref'> {
  nodeRef: RefCallback<HTMLDivElement>;
}

export type { AnchoredFallbackProps };
