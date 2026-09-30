/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { floatingRect } from '../behavior/floating-rect';
import { rectStyle } from '../behavior/rect-style';
import type { DockFloatingProps } from './DockFloating.type';

const DockFloating = (props: DockFloatingProps) => {
  const { floating, mainRect, drag, dragId, renderFloating } = props;
  return floating.map((entry) => {
    const live = drag?.floatingRect && dragId === entry.id ? drag.floatingRect : null;
    const rect = live ?? floatingRect(entry, mainRect);
    return (
      <Box key={entry.id} className="dock-layout__floating" data-floating-id={entry.id} style={rectStyle(rect)}>
        {renderFloating(entry, rect)}
      </Box>
    );
  });
};

export { DockFloating };
