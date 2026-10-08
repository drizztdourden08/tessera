/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { SpotlightState } from './tour-internal.type';
import { useSpotHoles } from './useSpotHoles';
import { useViewSize } from './useViewSize';

const useSpotlight = (root: HTMLElement | null, target: HTMLElement | null, kept: readonly HTMLElement[], settled?: string | null): SpotlightState => {
  const ringRef = useRef<HTMLElement>(null);
  const view = useViewSize(root);
  const holes = useSpotHoles(target, kept, ringRef, settled);
  return { ...holes, view, ringRef };
};

export { useSpotlight };
