/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { RESIZE_EDGES } from '../DockLayout.constants';
import { rectStyle } from '../behavior/rect-style';
import { useFloatResize } from '../behavior/useFloatResize';
import type { FloatingFrameProps } from './FloatingFrame.type';

const FloatingFrame = (props: FloatingFrameProps) => {
  const { entry, rect, bounds, min, resizable, onEdit, renderFloating } = props;
  const resize = useFloatResize({ id: entry.id, rect, bounds, min, onEdit });
  const shown = resize.live ?? rect;
  const cls = `dock-layout__floating${resize.live ? ' dock-layout__floating--resizing' : ''}`;

  return (
    <Box className={cls} data-floating-id={entry.id} style={rectStyle(shown)}>
      {renderFloating(entry, shown)}
      {resizable && RESIZE_EDGES.map((edge) => (
        <Box
          key={edge}
          className={`dock-resize dock-resize--${edge}`}
          data-resize-edge={edge}
          aria-hidden="true"
          onPointerDown={(e) => resize.onPointerDown(edge, e)}
        />
      ))}
    </Box>
  );
};

export { FloatingFrame };
