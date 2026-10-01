/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import { GHOST_OFFSET } from '../DockLayout.constants';
import { DragGhostKey } from './DragGhostKey';
import type { DragGhostProps } from './DragGhost.type';

const DragGhost = (props: DragGhostProps) => {
  const { pointer, label, swap, overlay, outside, canPopOut } = props.view;
  const { widgets } = useTesseraStrings();
  const style = useMemo<CSSProperties>(
    () => ({ left: pointer.x + GHOST_OFFSET, top: pointer.y + GHOST_OFFSET }),
    [pointer.x, pointer.y],
  );
  return (
    <Box className="dock-ghost" style={style} aria-hidden="true">
      <Span className="dock-ghost__label">{label}</Span>
      <Box className="dock-ghost__keys">
        <DragGhostKey keys="shift" does={widgets.ghostSwap} lit={swap} />
        <DragGhostKey keys="ctrl" does={widgets.ghostOverlay} lit={overlay} />
        <DragGhostKey keys="esc" does={widgets.ghostCancel} lit={false} />
        {canPopOut
          ? <DragGhostKey gesture={widgets.ghostPastEdge} does={widgets.ghostPopOut} lit={outside} />
          : <Span className="dock-ghost__does">{widgets.ghostStays}</Span>}
      </Box>
    </Box>
  );
};

export { DragGhost };
