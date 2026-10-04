/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { SAFE_AREA_GRACE, SAFE_AREA_SLACK } from '../DropdownMenu.constants';
import { safeAreaStyle } from './safe-area-style';
import type { SafeAreaOptions } from './useSafeArea.type';

const useSafeArea = (options: SafeAreaOptions): void => {
  const { rowRef, panelRef, areaRef, bodyRef, join } = options;

  useEffect(() => {
    const row = rowRef.current;
    const panel = panelRef.current;
    const area = areaRef.current;
    if (!join || !row || !panel || !area) return undefined;
    const view = ownerWindowOf(row);
    let timer = 0;
    let lastX = Number.NEGATIVE_INFINITY;
    const collapse = (): void => area.removeAttribute('style');
    const frameX = (clientX: number, box: DOMRect): number => (join.side === 'right' ? clientX - box.left : box.right - clientX);
    const place = (event: PointerEvent): void => {
      const box = panel.getBoundingClientRect();
      const rowBox = row.getBoundingClientRect();
      const edge = frameX(join.side === 'right' ? rowBox.right : rowBox.left, box);
      const rowFrame = { top: rowBox.top - box.top, bottom: rowBox.bottom - box.top, edge };
      const style = safeAreaStyle(join, rowFrame, frameX(event.clientX, box) - SAFE_AREA_SLACK, event.clientY - box.top);
      if (style) Object.assign(area.style, style);
      else collapse();
    };
    const onMove = (event: PointerEvent): void => {
      const target = event.target as Node;
      const x = frameX(event.clientX, panel.getBoundingClientRect());
      if (area.contains(target)) {
        if (x > lastX) {
          view.clearTimeout(timer);
          timer = view.setTimeout(collapse, SAFE_AREA_GRACE);
        }
        lastX = x;
        return;
      }
      view.clearTimeout(timer);
      if (panel.contains(target) && !bodyRef.current?.contains(target)) {
        collapse();
        return;
      }
      place(event);
      lastX = x;
    };
    row.addEventListener('pointermove', onMove);
    return () => {
      row.removeEventListener('pointermove', onMove);
      view.clearTimeout(timer);
      collapse();
    };
  }, [rowRef, panelRef, areaRef, bodyRef, join]);
};

export { useSafeArea };
