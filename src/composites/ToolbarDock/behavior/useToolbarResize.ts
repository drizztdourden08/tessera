/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { ResizeChange } from '../../ResizeHandle/ResizeHandle.type';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ToolbarLayout } from '../ToolbarDock.type';
import { resizeToolbarEnd } from './resize-toolbar-end';
import type { ToolbarEndHandlersFor, ToolbarResizeLatest, ToolbarResizeParams } from './toolbar-resize-hook.type';
import type { ToolbarEnd } from './toolbar-resize.type';
import { toolbarLabelIn } from './toolbar-label-in';
import { toolbarResizeMessage } from './toolbar-resize-message';

const useToolbarResize = (params: ToolbarResizeParams) => {
  const { toolbars } = useTesseraStrings();
  const [draft, setDraft] = useState<ToolbarLayout | null>(null);
  const origin = useRef<ToolbarLayout | null>(null);
  const by = useRef<ResizeChange['by']>('key');
  const latest = useRef<ToolbarResizeLatest>({ ...params, words: toolbars });
  latest.current = { ...params, words: toolbars };

  const compute = useCallback((id: string, end: ToolbarEnd, px: number): { base: ToolbarLayout; next: ToolbarLayout } | null => {
    const { layout, metrics } = latest.current;
    if (!metrics) return null;
    const base = by.current === 'drag' && origin.current ? origin.current : layout;
    return { base, next: resizeToolbarEnd(base, metrics, { id, end }, px) };
  }, []);

  const handlersFor = useCallback<ToolbarEndHandlersFor>((id, end) => ({
    onDragChange: (dragging) => {
      if (!dragging) return;
      by.current = 'drag';
      origin.current = latest.current.layout;
      latest.current.say(latest.current.words.resizeStart(toolbarLabelIn(latest.current.definitions, id)));
    },
    onResize: (px, change) => {
      by.current = change.by;
      if (change.by === 'key') return;
      const moved = compute(id, end, px);
      if (moved) setDraft(moved.next === moved.base ? null : moved.next);
    },
    onResizeEnd: (px) => {
      const moved = compute(id, end, px);
      origin.current = null;
      setDraft(null);
      if (!moved || moved.next === moved.base) return;
      const { onLayoutChange, say, words, definitions } = latest.current;
      onLayoutChange(moved.next);
      say(toolbarResizeMessage(words, definitions, { before: moved.base, after: moved.next, id }));
    },
  }), [compute]);

  return { draft, handlersFor };
};

export { useToolbarResize };
