/* @layer renderer-components @kind hook */
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../dom/owner-window';
import { useInBrowser } from '../../Portal/behavior/useInBrowser';
import { supportsAnchoring } from './supports-anchoring';

const useAnchorSupport = (anchorRef: RefObject<HTMLElement | null>): boolean => {
  const inBrowser = useInBrowser();
  return inBrowser && supportsAnchoring(ownerWindowOf(anchorRef.current));
};

export { useAnchorSupport };
