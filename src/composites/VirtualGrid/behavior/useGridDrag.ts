/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { contentPoint } from '../../marquee/content-point';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import { bodyOrigin } from '../../virtual/body-origin';
import { gridPointerHandlers } from './grid-pointer-handlers';
import { gridPointAt } from './grid-point-at';
import type { GridTarget } from './grid-point-at.type';
import type { GridDrag, UseGridDragInput } from './useGridDrag.type';

const sameTarget = (a: GridTarget | null, b: GridTarget): boolean =>
  a !== null && a.kind === b.kind && a.section === b.section && (a.kind === 'into' || (b.kind === 'gap' && a.index === b.index));

const useGridDrag = <T,>(input: UseGridDragInput<T>): GridDrag => {
  const { sections, rootRef, bodyRef, tileWidth, layout, heights, keys, sectionKeys, selected, holeKeys, onDrop } = input;
  const [target, setTarget] = useState<GridTarget | null>(null);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const landing = useRef<GridTarget | null>(null);
  const swallow = useRef(false);

  const keysOf = useCallback((index: number): readonly string[] => {
    const key = keys[index];
    if (key === undefined) return [];
    return selected.has(key) ? keys.filter((each) => selected.has(each) && !holeKeys.has(each)) : [key];
  }, [keys, selected, holeKeys]);

  const locate = (point: { clientX: number; clientY: number }): number => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return keys.length;
    const found = gridPointAt({
      layout, heights, tileWidth: tileWidth.current || heights.tile, origin: bodyOrigin(root, body),
      point: contentPoint(root, cssZoomOf(root), { x: point.clientX, y: point.clientY }), sectionKeys, sectioned: sections !== undefined,
      canInto: (section) => sections?.[section]?.onDrop !== undefined,
    });
    if (!sameTarget(landing.current, found)) setTarget(found);
    landing.current = found;
    return found.kind === 'gap' ? found.index : -1;
  };

  const drag = useReorderDrag({
    listRef: bodyRef, selector: ITEM_SELECTOR, locate, keys: keysOf, scrollRef: rootRef,
    onDrop: (_from, _to, info) => {
      if (landing.current) onDrop(info.keys, landing.current, info.modifier);
    },
  });

  const handlersOf = (item: number) => gridPointerHandlers({ raw: drag.handlers(item), start, setStart, setTarget, landing, swallow });

  const swallowClick = () => {
    const held = swallow.current;
    swallow.current = false;
    return held;
  };

  return { drag, target, keysOf, handlersOf, swallowClick };
};

export { useGridDrag };
