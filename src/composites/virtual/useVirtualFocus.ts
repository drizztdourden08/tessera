/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { scrollTopForSpan } from './scroll-top-for-span';
import type { KeyboardEvent } from 'react';
import type { VirtualFocus, VirtualFocusInput } from './virtual-focus.type';

const useVirtualFocus = (input: VirtualFocusInput): VirtualFocus => {
  const { rootRef, bodyRef, cellAttribute, metrics, onScroll, resolve, spanOf, axis = 'vertical', onMove, onActiveChange } = input;
  const across = axis === 'horizontal';
  const pending = useRef<number | null>(null);
  const [active, setActive] = useState(0);

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
    const root = rootRef.current;
    const viewport = (across ? root?.clientWidth : root?.clientHeight) ?? metrics.viewport;
    return Math.max(1, Math.floor(viewport / metrics.rowHeight) - 1);
  }, [rootRef, metrics, across]);

  const goTo = useCallback((index: number, row: number) => {
    pending.current = index;
    activate(index);
    const root = rootRef.current;
    if (!root) return;
    const viewport = across ? root.clientWidth : root.clientHeight;
    const span = spanOf?.(row) ?? { top: row * metrics.rowHeight, height: metrics.rowHeight };
    const place = { ...span, viewport, scrollTop: across ? root.scrollLeft : root.scrollTop };
    if (across) root.scrollLeft = scrollTopForSpan(place, 'nearest');
    else root.scrollTop = scrollTopForSpan(place, 'nearest');
    onScroll();
  }, [rootRef, metrics, spanOf, activate, onScroll, across]);

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
