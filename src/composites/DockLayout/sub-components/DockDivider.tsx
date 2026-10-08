/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import type { ResizeChange } from '../../ResizeHandle/ResizeHandle.type';
import { dividerRange } from '../behavior/divider-range';
import { rectStyle } from '../behavior/rect-style';
import type { DockDividerProps } from './DockDivider.type';

const DockDivider = (props: DockDividerProps) => {
  const { divider, onEdit } = props;
  const { node, index, along, rect } = divider;
  const { navigation } = useTesseraStrings();
  const style = useMemo(() => rectStyle(rect), [rect]);
  const range = dividerRange(divider);
  const resize = (next: number, change: ResizeChange) => {
    if (along > 0) onEdit({ type: 'resize', node, index, delta: (next - change.from) / along });
  };

  return (
    <Box className="dock-divider" style={style}>
      <ResizeHandle
        look="ghost"
        orientation={node.axis === 'row' ? 'horizontal' : 'vertical'}
        label={navigation.resizePanes(navigation.firstPane, navigation.secondPane)}
        {...range}
        onResize={resize}
        onReset={() => onEdit({ type: 'even', node, index })}
      />
    </Box>
  );
};

export { DockDivider };
