/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../primitives/text-elements';
import { useBesidePointer } from '../DockLayout/behavior/useBesidePointer';
import { stageFrame } from '../DockLayout/behavior/stage-frame';
import { DragGhostKey } from './DragGhostKey';
import type { DragGhostProps } from './DragGhost.type';
import './DragGhost.css';

const DragGhost = (props: DragGhostProps) => {
  const { pointer, label, swap, overlay, plain = false } = props;
  const { widgets } = useTesseraStrings();
  const ref = useRef<HTMLDivElement>(null);
  const place = useBesidePointer(ref, pointer, stageFrame);
  return (
    <Box ref={ref} className="dock-ghost" style={place} aria-hidden="true">
      <Span className="dock-ghost__label">{label}</Span>
      {!plain && <DragGhostKey keys="shift" does={widgets.ghostSwap} lit={swap} />}
      {!plain && <DragGhostKey keys="ctrl" does={widgets.ghostOverlay} lit={overlay} />}
      <DragGhostKey keys="esc" does={widgets.ghostCancel} lit={false} />
    </Box>
  );
};

export { DragGhost };
