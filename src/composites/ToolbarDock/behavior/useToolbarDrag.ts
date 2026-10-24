/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { stagePoint } from '../../dock-zones/stage-point';
import { focusToolbarHandle } from './focus-toolbar-handle';
import { listenToolbarPress } from './listen-toolbar-press';
import type { ToolbarDragLatest, ToolbarDragParams, ToolbarDragView, ToolbarPress } from './toolbar-drag.type';
import { toolbarDropLayout } from './toolbar-drop-layout';
import { toolbarHandleOf } from './toolbar-handle-of';
import { toolbarSideOf } from './toolbar-side-of';

const leavePress = (root: HTMLElement | null, p: ToolbarPress | null): void => {
  if (!root || !p) return;
  if (!p.live) focusToolbarHandle(root, p.id);
  else if (root.hasPointerCapture(p.pointerId)) root.releasePointerCapture(p.pointerId);
};

const useToolbarDrag = (params: ToolbarDragParams) => {
  const { rootRef, layout, definitions, onLayoutChange } = params;
  const [drag, setDrag] = useState<ToolbarDragView | null>(null);
  const press = useRef<ToolbarPress | null>(null);
  const detach = useRef<(() => void) | null>(null);
  const restore = useRef<string | null>(null);
  const latest = useRef<ToolbarDragLatest>({ layout, definitions, onLayoutChange });
  latest.current = { layout, definitions, onLayoutChange };

  const end = useCallback(() => {
    const p = press.current;
    leavePress(rootRef.current, p);
    detach.current?.();
    detach.current = null;
    press.current = null;
    restore.current = p?.live ? p.id : null;
    setDrag(null);
  }, [rootRef]);

  const drop = useCallback(() => {
    const p = press.current;
    end();
    if (!p?.live) return;
    const { layout: current, onLayoutChange: change } = latest.current;
    const next = toolbarDropLayout(current, p.id, p.target);
    if (next !== current) change(next);
  }, [end]);

  useEffect(() => () => detach.current?.(), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || restore.current === null) return;
    focusToolbarHandle(root, restore.current);
    restore.current = null;
  });

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const root = rootRef.current;
    if (e.button !== 0 || !root || press.current) return;
    const id = toolbarHandleOf(e.target);
    if (id === null || toolbarSideOf(latest.current.layout, id) === null) return;
    e.preventDefault();
    press.current = { id, pointerId: e.pointerId, start: stagePoint(root, e), live: false, frame: null, target: { kind: 'none' } };
    detach.current = listenToolbarPress({ root, press, latest, drop, cancel: end, show: setDrag });
  }, [rootRef, drop, end]);

  return { drag, onPointerDown };
};

export { useToolbarDrag };
