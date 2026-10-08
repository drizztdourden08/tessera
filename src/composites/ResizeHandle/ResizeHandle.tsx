/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { handleClass } from './behavior/handle-class';
import { resizeKeyDown } from './behavior/resize-key-down';
import { resizeOptionsOf } from './behavior/resize-options-of';
import { useResizeDrag } from './behavior/useResizeDrag';
import { useShownValue } from './behavior/useShownValue';
import type { ResizeHandleProps } from './ResizeHandle.type';
import '../../theme/focus-ring.css';
import './ResizeHandle.css';

const ResizeHandle = (props: ResizeHandleProps) => {
  const { label, value, min, max, look = 'grip', measure, onReset, controls, title, className, onClick, onDragOver, onDrop, children } = props;
  const options = resizeOptionsOf(props);
  const { orientation } = options;
  const drag = useResizeDrag(options);
  const { shown, refresh } = useShownValue(value, measure);
  const filled = children !== undefined;

  return (
    <Box
      className={handleClass({ look, orientation, filled, dragging: drag.dragging, className })}
      role="separator"
      aria-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
      aria-label={label}
      aria-valuenow={shown === undefined ? undefined : Math.round(shown)}
      aria-valuemin={Math.round(min)}
      aria-valuemax={Math.round(max)}
      aria-controls={controls}
      tabIndex={0}
      title={title}
      draggable={false}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerCancel={drag.onPointerUp}
      onKeyDown={(event) => resizeKeyDown(event, options)}
      onDoubleClick={onReset}
      onFocus={refresh}
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {filled ? children : look === 'grip' && <Box className="resize-handle__grip" />}
    </Box>
  );
};

export { ResizeHandle };
