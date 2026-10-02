/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import type { ValueScale } from '../../value-rule/value-rule.type';
import { grabThumb } from './grab-thumb';
import { nearestThumb } from './nearest-thumb';
import { railPoint } from './rail-point';
import { snapValue } from './snap-value';
import type { DragState, Grab, RangeDrag } from './useRangeDrag.type';
import type { RangeThumbs, Thumb } from './useRangeThumbs.type';

const pointOf = (event: PointerEvent<HTMLDivElement>, scale: ValueScale) => railPoint(event.clientX, event.currentTarget.getBoundingClientRect(), scale);

const settle = (grab: Grab, target: number, low: number, high: number): Thumb | null => {
  if (grab !== 'both') return grab;
  if (target < low) return 'low';
  return target > high ? 'high' : null;
};

const useRangeDrag = (thumbs: RangeThumbs, scale: ValueScale, disabled: boolean): RangeDrag => {
  const drag = useRef<DragState | null>(null);
  const [hot, setHot] = useState<Thumb | null>(null);
  const { low, high } = thumbs;

  const move = (thumb: Thumb, target: number) => {
    (thumb === 'low' ? thumbs.setLow : thumbs.setHigh)(snapValue(target, scale));
    const input = (thumb === 'low' ? thumbs.lowRef : thumbs.highRef).current;
    if (input && input.ownerDocument.activeElement !== input) input.focus();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const { at, reach } = pointOf(event, scale);
    const hit = grabThumb(at, low, high, reach);
    const grab = hit ?? nearestThumb(at, low, high);
    const from = grab === 'high' ? high : low;
    drag.current = { grab, offset: hit === null ? 0 : at - from };
    if (grab !== 'both') move(grab, hit === null ? at : from);
    setHot(grab === 'both' ? null : grab);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const { at, reach } = pointOf(event, scale);
    const current = drag.current;
    if (!current) {
      const over = grabThumb(at, low, high, reach);
      setHot(over === 'both' ? 'high' : over);
      return;
    }
    const thumb = settle(current.grab, at - current.offset, low, high);
    if (thumb === null) return;
    current.grab = thumb;
    setHot(thumb);
    move(thumb, at - current.offset);
  };

  const end = () => {
    drag.current = null;
  };
  const onPointerLeave = () => {
    if (!drag.current) setHot(null);
  };

  return { hot, rail: { onPointerDown, onPointerMove, onPointerUp: end, onPointerCancel: end, onPointerLeave } };
};

export { useRangeDrag };
