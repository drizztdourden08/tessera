/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { AnchoredProps } from '../Anchored.type';

interface UseAnchoredDismissParams extends Pick<AnchoredProps, 'onDismiss' | 'dismissOnEscape' | 'dismissOnOutsidePress'> {
  popupRef: RefObject<HTMLElement | null>;
  anchor: RefObject<HTMLElement | null>;
}

export type { UseAnchoredDismissParams };
