/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { GHOST_OFFSET } from '../DockLayout.constants';
import { DragGhostKey } from './DragGhostKey';
import type { DragGhostProps } from './DragGhost.type';

const DragGhost = (props: DragGhostProps) => {
  const { pointer, label, swap, overlay, outside, canPopOut } = props.view;
  const style = useMemo<CSSProperties>(
    () => ({ left: pointer.x + GHOST_OFFSET, top: pointer.y + GHOST_OFFSET }),
    [pointer.x, pointer.y],
  );
  return (
    <Box className="dock-ghost" style={style} aria-hidden="true">
      <Span className="dock-ghost__label">{label}</Span>
      <Box className="dock-ghost__keys">
        <DragGhostKey keys="shift" does="swap" lit={swap} />
        <DragGhostKey keys="ctrl" does="overlay" lit={overlay} />
        <DragGhostKey keys="esc" does="cancel" lit={false} />
        {canPopOut
          ? <DragGhostKey gesture="Past the edge" does="pop out" lit={outside} />
          : <Span className="dock-ghost__does">stays in the app</Span>}
      </Box>
    </Box>
  );
};

export { DragGhost };
