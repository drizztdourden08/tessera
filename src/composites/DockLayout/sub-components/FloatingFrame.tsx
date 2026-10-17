/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { rectStyle } from '../../rect-drag/rect-style';
import { ResizeEdges } from '../../rect-drag/ResizeEdges';
import { useFloatResize } from '../behavior/useFloatResize';
import { SnapGuides } from './SnapGuides';
import type { FloatingFrameProps } from './FloatingFrame.type';

const FloatingFrame = (props: FloatingFrameProps) => {
  const { entry, rect, bounds, min, resizable, snap, onEdit, renderFloating } = props;
  const resize = useFloatResize({ id: entry.id, rect, bounds, min, snap, onEdit });
  const shown = resize.live?.rect ?? rect;
  const cls = `dock-layout__floating${resize.live ? ' dock-layout__floating--resizing' : ''}`;

  return (
    <>
      <Box className={cls} data-floating-id={entry.id} style={rectStyle(shown)}>
        {renderFloating(entry, shown)}
        {resizable && <ResizeEdges onPointerDown={resize.onPointerDown} />}
      </Box>
      {resize.live && <SnapGuides guides={resize.live.guides} />}
    </>
  );
};

export { FloatingFrame };
