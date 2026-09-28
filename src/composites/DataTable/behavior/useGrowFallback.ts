/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import { renderedHeaderWidth } from './renderedHeaderWidth';
import { isOverflowing } from './overflow-probe';
import { useMeasuredFallback } from './useMeasuredFallback';
import type { RefObject } from 'react';
import type { GrowFallback } from './overflow-probe.type';
import type { FallbackResolver } from './useMeasuredFallback.type';
import type { UseGrowFallbackInput } from './useGrowFallback.type';

const sum = (values: readonly number[]): number =>
  values.reduce((total, value) => total + value, 0);

const fittedWhenOverflowing: FallbackResolver = (root, paths, fitted) => {
  const overflowing = isOverflowing({
    scrollWidth: root.scrollWidth,
    clientWidth: root.clientWidth,
    flexibleRendered: sum(paths.map((path) => renderedHeaderWidth(root, path))),
    flexibleFitted: sum([...fitted.values()]),
  });
  return overflowing ? fitted : null;
};

const watchWidth = (root: HTMLElement, seenWidthRef: RefObject<number>, onChange: () => void) => {
  if (typeof ResizeObserver === 'undefined') return undefined;
  const observer = new ResizeObserver(() => {
    if (root.clientWidth === seenWidthRef.current) return;
    seenWidthRef.current = root.clientWidth;
    onChange();
  });
  observer.observe(root);
  return () => observer.disconnect();
};

const useGrowFallback = ({ columns, rootRef }: UseGrowFallbackInput): GrowFallback => {
  const seenWidthRef = useRef(-1);
  const watch = useCallback((root: HTMLElement, onChange: () => void) => watchWidth(root, seenWidthRef, onChange), []);
  return useMeasuredFallback({ columns, rootRef, flag: 'grow', resolve: fittedWhenOverflowing, watch });
};

export { useGrowFallback };
