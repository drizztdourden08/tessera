/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface UseAnchorTrackingParams<T> {
  active: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  compute: (rect: DOMRect) => T;
  onOutOfView?: () => void;
}

interface UseAnchorTrackingResult<T> {
  position: T | null;
  reposition: () => void;
}

export type { UseAnchorTrackingParams, UseAnchorTrackingResult };
