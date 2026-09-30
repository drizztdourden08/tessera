/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { LayoutEdit } from '../DockLayout.type';
import type { DividerRect } from './layout-tree.type';

const useDividerDrag = (divider: DividerRect, onEdit: (edit: LayoutEdit) => void) => {
  const { node, index, along } = divider;
  const [dragging, setDragging] = useState(false);
  const detach = useRef<(() => void) | null>(null);
  const latest = useRef({ node, index, along, onEdit });
  latest.current = { node, index, along, onEdit };

  useEffect(() => () => detach.current?.(), []);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    if (e.button !== 0 || detach.current) return;
    e.preventDefault();
    e.stopPropagation();
    const view = ownerWindowOf(e.currentTarget);
    const readAxis = (ev: { clientX: number; clientY: number }): number => (latest.current.node.axis === 'row' ? ev.clientX : ev.clientY);
    const pointerId = e.pointerId;
    let last = readAxis(e);
    const onMove = (ev: PointerEvent): void => {
      const { node: split, index: at, along: length, onEdit: emit } = latest.current;
      if (ev.pointerId !== pointerId || length <= 0) return;
      const now = readAxis(ev);
      const delta = (now - last) / length;
      last = now;
      if (delta !== 0) emit({ type: 'resize', node: split, index: at, delta });
    };
    const onUp = (ev: PointerEvent): void => {
      if (ev.pointerId === pointerId) detach.current?.();
    };
    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerup', onUp);
    view.addEventListener('pointercancel', onUp);
    detach.current = () => {
      view.removeEventListener('pointermove', onMove);
      view.removeEventListener('pointerup', onUp);
      view.removeEventListener('pointercancel', onUp);
      detach.current = null;
      setDragging(false);
    };
    setDragging(true);
  }, []);

  const onDoubleClick = useCallback(() => {
    const { node: split, index: at, onEdit: emit } = latest.current;
    emit({ type: 'even', node: split, index: at });
  }, []);

  return { dragging, onPointerDown, onDoubleClick };
};

export { useDividerDrag };
