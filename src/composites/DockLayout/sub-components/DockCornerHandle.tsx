/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { cornerSeamOf } from '../behavior/corner-seam-of';
import { turnOfKey } from '../behavior/turn-of-key';
import type { DockCornerHandleProps } from './DockCornerHandle.type';
import './DockCornerHandle.css';

const DockCornerHandle = (props: DockCornerHandleProps) => {
  const { handle, label, hint, onTurn } = props;
  const { along, end } = handle;
  const style = useMemo(() => {
    const seam = cornerSeamOf(handle);
    return { left: seam.x, top: seam.y };
  }, [handle]);
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const turn = turnOfKey(event.key, handle);
    if (!turn) return;
    event.preventDefault();
    event.stopPropagation();
    onTurn(handle, turn);
  };

  return (
    <Box
      className={`dock-corner dock-corner--${along} dock-corner--${end}`}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={label}
      title={hint}
      onKeyDown={onKeyDown}
    />
  );
};

export { DockCornerHandle };
