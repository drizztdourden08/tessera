/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import type { PointerEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { rectStyle } from '../../rect-drag/rect-style';
import { turnOfDrag } from '../behavior/turn-of-drag';
import type { DockCornerZoneProps } from './DockCornerZone.type';
import './DockCornerZone.css';

const DockCornerZone = (props: DockCornerZoneProps) => {
  const { zone, origin, hint, onTurn } = props;
  const { axis, rect, pulls } = zone;
  const style = useMemo(
    () => rectStyle({ x: rect.x - origin.x, y: rect.y - origin.y, width: rect.width, height: rect.height }),
    [rect, origin.x, origin.y],
  );
  const press = useRef<{ from: number; done: boolean } | null>(null);
  const coordOf = (event: PointerEvent<HTMLElement>) => (axis === 'row' ? event.clientX : event.clientY);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    press.current = { from: coordOf(event), done: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const held = press.current;
    if (!held || held.done) return;
    const moved = coordOf(event) - held.from;
    for (const pull of pulls) {
      const turn = turnOfDrag(moved * pull.outward, pull);
      if (!turn) continue;
      held.done = true;
      onTurn(pull.handle, turn);
      return;
    }
  };
  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!press.current) return;
    press.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <Box
      className={`dock-corner-zone dock-corner-zone--${axis}`}
      style={style}
      title={hint}
      draggable={false}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
};

export { DockCornerZone };
