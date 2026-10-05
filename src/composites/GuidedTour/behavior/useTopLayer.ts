/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { RefObject } from 'react';
import { useShownPopover } from '../../../primitives/Anchored/behavior/useShownPopover';
import { popoverReady } from './popover-ready';

const useTopLayer = <T extends HTMLElement>(): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  useShownPopover(popoverReady(), ref);
  return ref;
};

export { useTopLayer };
