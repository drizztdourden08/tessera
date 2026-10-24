/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { scrollTopToShow } from './scroll-top-to-show';
import type { KeyboardEvent } from 'react';
import type { VirtualFocus, VirtualFocusInput } from './virtual-focus.type';

const useVirtualFocus = (input: VirtualFocusInput): VirtualFocus => {
  const { rootRef, bodyRef, cellAttribute, metrics, onScroll, resolve, onActiveChange } = input;
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
    const viewport = rootRef.current?.clientHeight ?? metrics.viewport;
    return Math.max(1, Math.floor(viewport / metrics.rowHeight) - 1);
  }, [rootRef, metrics]);

  const goTo = useCallback((index: number, row: number) => {
    pending.current = index;
    activate(index);
    const root = rootRef.current;
    if (!root) return;
    const viewport = root.clientHeight;
    root.scrollTop = scrollTopToShow({ index: row, rowHeight: metrics.rowHeight, viewport, scrollTop: root.scrollTop });
    onScroll();
  }, [rootRef, metrics, activate, onScroll]);

  const navigate = useCallback((event: KeyboardEvent<HTMLElement>, index: number) => {
    if (event.target !== event.currentTarget) return;
    const target = resolve(event, index, pageRows());
    if (!target) return;
    event.preventDefault();
    if (target.index !== index) goTo(target.index, target.row);
  }, [resolve, pageRows, goTo]);

  return { active, activate, navigate };
};

export { useVirtualFocus };
