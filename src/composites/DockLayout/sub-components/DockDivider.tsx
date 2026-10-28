/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import type { ResizeChange } from '../../ResizeHandle/ResizeHandle.type';
import { dividerRange } from '../behavior/divider-range';
import { rectStyle } from '../../rect-drag/rect-style';
import type { ResizeOrigin } from '../behavior/resize-origin.type';
import { DockCornerZone } from './DockCornerZone';
import type { DockDividerProps } from './DockDivider.type';

const DockDivider = (props: DockDividerProps) => {
  const { divider, zones, hint, onEdit, onTurn } = props;
  const { node, index, along, rect } = divider;
  const { navigation } = useTesseraStrings();
  const style = useMemo(() => rectStyle(rect), [rect]);
  const range = dividerRange(divider);
  const start = useRef<{ sizes: readonly number[]; value: number } | null>(null);
  const resize = (next: number, change: ResizeChange) => {
    if (!(along > 0)) return;
    const from = start.current;
    const origin: ResizeOrigin | undefined = from ? { sizes: from.sizes, delta: (next - from.value) / along } : undefined;
    onEdit({ type: 'resize', node, index, delta: (next - change.from) / along, origin });
  };
  const hold = (dragging: boolean) => {
    start.current = dragging ? { sizes: node.sizes, value: range.value } : null;
  };

  return (
    <Box className="dock-divider" style={style}>
      <ResizeHandle
        orientation={node.axis === 'row' ? 'horizontal' : 'vertical'}
        label={navigation.resizePanes(navigation.firstPane, navigation.secondPane)}
        {...range}
        onResize={resize}
        onDragChange={hold}
        onReset={() => onEdit({ type: 'even', node, index })}
      />
      {zones.map((zone) => <DockCornerZone key={zone.key} zone={zone} origin={rect} hint={hint} onTurn={onTurn} />)}
    </Box>
  );
};

export { DockDivider };
