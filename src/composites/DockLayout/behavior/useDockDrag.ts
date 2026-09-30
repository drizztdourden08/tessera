/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { WidgetId } from '../DockLayout.type';
import type { DockDragLatest, DockDragParams, Press } from './dock-hooks.type';
import type { DragView } from './drag.type';
import { handleOf } from './handle-of';
import { listenPress } from './listen-press';
import { sourceFrom } from './source-from';
import { stagePoint } from './stage-point';

const useDockDrag = (params: DockDragParams) => {
  const { stageRef, context, onEdit, onPopOut } = params;
  const [drag, setDrag] = useState<DragView | null>(null);
  const [dragId, setDragId] = useState<WidgetId | null>(null);
  const press = useRef<Press | null>(null);
  const detach = useRef<(() => void) | null>(null);
  const latest = useRef<DockDragLatest>({ context, onEdit, onPopOut });
  latest.current = { context, onEdit, onPopOut };

  const finish = useCallback(() => {
    const stage = stageRef.current;
    const p = press.current;
    if (stage && p?.live && stage.hasPointerCapture(p.pointerId)) stage.releasePointerCapture(p.pointerId);
    detach.current?.();
    detach.current = null;
    press.current = null;
    setDrag(null);
    setDragId(null);
  }, [stageRef]);

  const show = useCallback((view: DragView, id: WidgetId | null) => {
    setDrag(view);
    setDragId(id);
  }, []);

  useEffect(() => () => detach.current?.(), []);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const stage = stageRef.current;
    if (e.button !== 0 || !stage || press.current) return;
    const handle = handleOf(e.target);
    if (!handle) return;
    const box = stage.getBoundingClientRect();
    const source = sourceFrom(handle, latest.current.context, { x: box.left, y: box.top }, stagePoint(stage, e));
    if (!source) return;
    e.preventDefault();
    press.current = { source, pointerId: e.pointerId, live: false, view: null };
    detach.current = listenPress({ stage, press, latest, finish, show });
  }, [stageRef, finish, show]);

  return { drag, dragId, onPointerDown };
};

export { useDockDrag };
