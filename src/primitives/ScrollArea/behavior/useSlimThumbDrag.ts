/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import type { ScrollAxis } from '../ScrollArea.type';
import { slimThumbHit } from './slim-thumb-hit';
import type { ThumbDrag } from './slim-thumb.type';

const markThumb = (node: HTMLElement, state: 'hover' | 'drag' | null): void => {
  if (state) node.dataset.scrollThumb = state;
  else delete node.dataset.scrollThumb;
};

const useSlimThumbDrag = (nodeRef: RefObject<HTMLDivElement | null>, axis: ScrollAxis, enabled: boolean): void => {
  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !enabled) return undefined;
    let drag: ThumbDrag | null = null;
    const onDown = (event: PointerEvent): void => {
      const hit = event.button === 0 ? slimThumbHit(node, axis, event.clientX, event.clientY) : null;
      if (!hit) return;
      event.preventDefault();
      event.stopPropagation();
      node.setPointerCapture(event.pointerId);
      const y = hit.along === 'y';
      drag = { ...hit, pointer: y ? event.clientY : event.clientX, start: y ? node.scrollTop : node.scrollLeft };
      markThumb(node, 'drag');
    };
    const onMove = (event: PointerEvent): void => {
      if (!drag) {
        markThumb(node, slimThumbHit(node, axis, event.clientX, event.clientY) ? 'hover' : null);
        return;
      }
      const y = drag.along === 'y';
      const next = drag.start + ((y ? event.clientY : event.clientX) - drag.pointer) * drag.ratio;
      node.scrollTo(y ? { top: next, behavior: 'instant' } : { left: next, behavior: 'instant' });
    };
    const onEnd = (): void => {
      drag = null;
      markThumb(node, null);
    };
    node.addEventListener('pointerdown', onDown, true);
    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerup', onEnd);
    node.addEventListener('pointercancel', onEnd);
    node.addEventListener('pointerleave', onEnd);
    return () => {
      node.removeEventListener('pointerdown', onDown, true);
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerup', onEnd);
      node.removeEventListener('pointercancel', onEnd);
      node.removeEventListener('pointerleave', onEnd);
      markThumb(node, null);
    };
  }, [nodeRef, axis, enabled]);
};

export { useSlimThumbDrag };
