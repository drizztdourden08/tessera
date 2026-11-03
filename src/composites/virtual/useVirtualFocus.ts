/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { scrollToSpan } from './scroll-to-span';
import type { KeyboardEvent } from 'react';
import type { VirtualFocus, VirtualFocusInput } from './virtual-focus.type';

const useVirtualFocus = (input: VirtualFocusInput): VirtualFocus => {
  const { rootRef, bodyRef, cellAttribute, metrics, onScroll, resolve, spanOf, axis = 'vertical', onMove, onActiveChange } = input;
  const { scrollerRef = rootRef, initialIndex = 0 } = input;
  const across = axis === 'horizontal';
  const pending = useRef<number | null>(null);
  const [active, setActive] = useState(initialIndex);

  useLayoutEffect(() => {
    const target = pending.current;
    if (target === null) return;
    const node = bodyRef.current?.querySelector<HTMLElement>(`[${cellAttribute}="${target}"]`);
    if (!node) return;
    pending.current = null;
    node.focus({ preventScroll: true });
  });

  const activate = useCallback((index: number) => {
    if (index === active) return;
    setActive(index);
    onActiveChange?.(index);
  }, [active, onActiveChange]);

  const pageRows = useCallback(() => {
    const scroller = scrollerRef.current;
    const viewport = (across ? scroller?.clientWidth : scroller?.clientHeight) ?? metrics.viewport;
    return Math.max(1, Math.floor(viewport / metrics.rowHeight) - 1);
  }, [scrollerRef, metrics, across]);

  const goTo = useCallback((index: number, row: number) => {
    pending.current = index;
    activate(index);
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const span = spanOf?.(row) ?? { top: row * metrics.rowHeight, height: metrics.rowHeight };
    scrollToSpan({ scroller, body: bodyRef.current, shifted: scroller !== rootRef.current, across, span, align: 'nearest' });
    onScroll();
  }, [scrollerRef, rootRef, bodyRef, metrics, spanOf, activate, onScroll, across]);

  const navigate = useCallback((event: KeyboardEvent<HTMLElement>, index: number) => {
    if (event.target !== event.currentTarget) return;
    const target = resolve(event, index, pageRows());
    if (!target) return;
    event.preventDefault();
    onMove?.(event, target, index);
    if (target.index !== index) goTo(target.index, target.row);
  }, [resolve, pageRows, goTo, onMove]);

  return { active, activate, jump: goTo, navigate };
};

export { useVirtualFocus };
