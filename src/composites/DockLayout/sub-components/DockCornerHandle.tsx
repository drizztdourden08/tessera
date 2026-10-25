/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { rectStyle } from '../../rect-drag/rect-style';
import { turnOfDrag } from '../behavior/turn-of-drag';
import { turnOfKey } from '../behavior/turn-of-key';
import type { DockCornerHandleProps } from './DockCornerHandle.type';
import '../../../theme/focus-ring.css';

const DockCornerHandle = (props: DockCornerHandleProps) => {
  const { handle, label, hint, onTurn } = props;
  const { along, end, rect } = handle;
  const style = useMemo(() => rectStyle(rect), [rect]);
  const press = useRef<{ from: number; done: boolean } | null>(null);
  const coordOf = (event: PointerEvent<HTMLElement>) => (along === 'row' ? event.clientX : event.clientY);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    press.current = { from: coordOf(event), done: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const held = press.current;
    if (!held || held.done) return;
    const turn = turnOfDrag((coordOf(event) - held.from) * (end === 'start' ? -1 : 1), handle);
    if (!turn) return;
    held.done = true;
    onTurn(handle, turn);
  };
  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!press.current) return;
    press.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const turn = turnOfKey(event.key, handle);
    if (!turn) return;
    event.preventDefault();
    event.stopPropagation();
    onTurn(handle, turn);
  };

  return (
    <Box
      className={`dock-corner dock-corner--${along} dock-corner--${end} focus-ring-inset`}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={label}
      title={hint}
      draggable={false}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    />
  );
};

export { DockCornerHandle };
