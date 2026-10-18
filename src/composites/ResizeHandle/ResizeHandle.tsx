/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ariaMinOf } from './behavior/aria-min-of';
import { handleClass } from './behavior/handle-class';
import { resizeKeyDown } from './behavior/resize-key-down';
import { resizeOptionsOf } from './behavior/resize-options-of';
import { shownNowOf } from './behavior/shown-now-of';
import { useResizeDrag } from './behavior/useResizeDrag';
import { useShownValue } from './behavior/useShownValue';
import type { ResizeHandleProps } from './ResizeHandle.type';
import '../../theme/focus-ring.css';
import './ResizeHandle.css';

const ResizeHandle = (props: ResizeHandleProps) => {
  const { label, value, max, measure, onReset, controls, title, className, onDragOver, onDrop } = props;
  const options = resizeOptionsOf(props);
  const { orientation } = options;
  const drag = useResizeDrag(options);
  const { shown, refresh } = useShownValue(value, measure);
  const now = shownNowOf(shown, options);

  return (
    <Box
      className={handleClass({ orientation, dragging: drag.dragging, className })}
      role="separator"
      aria-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
      aria-label={label}
      aria-valuenow={now === undefined ? undefined : Math.round(now)}
      aria-valuemin={ariaMinOf(options)}
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
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  );
};

export { ResizeHandle };
