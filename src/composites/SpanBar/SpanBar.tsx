/* @layer renderer-components @kind component */
import { useRef } from 'react';
import type { MouseEvent, PointerEvent } from 'react';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { tagHueClass } from '../../primitives/tag-hue/tag-hue-class';
import { cellCount, spanBox } from '../cell-geometry';
import { spanPlacement } from './behavior/span-placement';
import { useSpanDrag } from './behavior/useSpanDrag';
import { useSpanKeys } from './behavior/useSpanKeys';
import { SpanEdges } from './sub-components/SpanEdges';
import { SPAN_DEFAULT_MIN_LENGTH } from './SpanBar.constants';
import type { SpanBarProps } from './SpanBar.type';
import './SpanBar.css';

const SpanBar = (props: SpanBarProps) => {
  const { start, end, cells, count, onChange, onDraft, label, readOnly = false, selected = false, onSelect, onActivate, announce, snap = 'cell', minLength = SPAN_DEFAULT_MIN_LENGTH, colour, tint, data, className, children } = props;
  const total = cellCount(cells, count);
  const span = { start, end };
  const bodyRef = useRef<HTMLButtonElement | null>(null);
  const drag = useSpanDrag({ cells, total, span, snap, minLength, readOnly, onChange, onDraft });
  const onKeyDown = useSpanKeys({ span, total, minLength, readOnly, onChange, onActivate, announce });
  if (total === 0) return null;
  const box = drag.draft ?? spanBox(cells, span, total);
  const press = drag.press('move');

  return (
    <Box
      className={['span-bar', tagHueClass(colour), className].filter(Boolean).join(' ')}
      style={spanPlacement(box, tint)}
      data-tint={tint === undefined ? undefined : ''}
      {...data}
      data-selected={selected || undefined}
      data-dragging={drag.draft !== null || undefined}
      data-read-only={readOnly || undefined}
    >
      <Pressable
        ref={bodyRef}
        className="span-bar__body"
        aria-pressed={selected}
        aria-label={label}
        onPointerDown={(event: PointerEvent<HTMLElement>) => {
          bodyRef.current?.focus();
          press(event);
        }}
        onClick={(event: MouseEvent<HTMLElement>) => {
          if (!drag.consumeDrag()) onSelect?.(event);
        }}
        onDoubleClick={readOnly ? undefined : onActivate}
        onKeyDown={onKeyDown}
      >
        {children}
      </Pressable>
      <SpanEdges readOnly={readOnly} press={drag.press} />
    </Box>
  );
};

export { SpanBar };
