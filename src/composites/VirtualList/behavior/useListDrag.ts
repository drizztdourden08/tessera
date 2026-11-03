/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { contentPoint } from '../../marquee/content-point';
import { modifierOf } from '../../reorder/modifier-of';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { thresholdHandlers } from '../../reorder/threshold-handlers';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import { bodyOrigin } from '../../virtual/body-origin';
import { listGapAt } from './list-gap-at';
import type { ReorderModifier } from '../../reorder';
import type { ListDrag, UseListDragInput } from './useListDrag.type';

const useListDrag = (input: UseListDragInput): ListDrag => {
  const { rootRef, bodyRef, layout, axis, keysOf, onDrop } = input;
  const [target, setTarget] = useState<number | null>(null);
  const [modifier, setModifier] = useState<ReorderModifier>('none');
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const landing = useRef<number | null>(null);
  const swallow = useRef(false);

  const locate = (point: { clientX: number; clientY: number }): number => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return layout.count;
    const at = listGapAt(layout, axis, bodyOrigin(root, body), contentPoint(root, cssZoomOf(root), { x: point.clientX, y: point.clientY }));
    if (landing.current !== at) setTarget(at);
    landing.current = at;
    return at;
  };

  const drag = useReorderDrag({
    listRef: bodyRef, selector: ITEM_SELECTOR, axis, locate, keys: keysOf, scrollRef: rootRef,
    onDrop: (_from, _to, info) => {
      if (landing.current !== null) onDrop(info.keys, landing.current, info.modifier);
    },
  });

  const handlersOf: ListDrag['handlersOf'] = (index) => {
    const base = thresholdHandlers<number>({ raw: drag.handlers(index), start, setStart, setTarget, landing, swallow });
    return {
      ...base,
      onPointerMove: (event) => {
        setModifier(modifierOf(event));
        base.onPointerMove(event);
      },
    };
  };

  const swallowClick = () => {
    const held = swallow.current;
    swallow.current = false;
    return held;
  };

  return { drag, target, modifier, handlersOf, swallowClick };
};

export { useListDrag };
