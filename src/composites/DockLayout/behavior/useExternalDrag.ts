/* @layer renderer-components @kind hook */
import { useEffect, useMemo, useRef } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { ExternalDragParams } from './dock-hooks.type';
import type { DragView, ExternalPointer } from './drag.type';
import { externalDrop } from './external-drop';
import { externalView } from './external-view';

const useExternalDrag = (params: ExternalDragParams): DragView | null => {
  const { stageRef, context, externalDrag, onExternalDrop, sizeOf } = params;
  const latest = useRef({ context, onExternalDrop, sizeOf });
  latest.current = { context, onExternalDrop, sizeOf };
  const released = externalDrag?.released ?? false;

  const drag = useMemo<ExternalPointer | null>(() => {
    const stage = stageRef.current;
    if (!externalDrag || !stage) return null;
    const box = stage.getBoundingClientRect();
    return { id: externalDrag.id, pointer: { x: externalDrag.point.x - box.left, y: externalDrag.point.y - box.top } };
  }, [externalDrag, stageRef]);

  const view = useMemo(
    () => (drag && !released ? externalView(context, drag, ownerWindowOf(stageRef.current), sizeOf?.(drag.id)) : null),
    [drag, released, context, sizeOf, stageRef],
  );

  useEffect(() => {
    if (!drag || !released) return;
    const { context: ctx, onExternalDrop: answer, sizeOf: size } = latest.current;
    const result = externalDrop(ctx, drag, ownerWindowOf(stageRef.current), size?.(drag.id));
    answer?.(drag.id, result.edit ?? null);
  }, [drag, released, stageRef]);

  return view;
};

export { useExternalDrag };
