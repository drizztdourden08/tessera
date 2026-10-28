/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { keyMove } from './behavior/key-move';
import { moveViewport } from './behavior/move-viewport';
import { useNavigatorDrag } from './behavior/useNavigatorDrag';
import { viewportBoxOf } from './behavior/viewport-box-of';
import { viewportText } from './behavior/viewport-text';
import { STEPS_ACROSS } from './Navigator.constants';
import type { NavigatorProps } from './Navigator.type';
import './Navigator.css';

const Navigator = (props: NavigatorProps) => {
  const { surface, viewport, onViewportChange, children, label, step, className } = props;
  const { navigation } = useTesseraStrings();
  const mapRef = useRef<HTMLElement>(null);
  const drag = useNavigatorDrag({ surface, viewport, onViewportChange }, mapRef);
  const unit = step ?? Math.max(surface.width, surface.height) / STEPS_ACROSS;
  const classes = ['navigator', drag.dragging && 'navigator--dragging', className].filter(Boolean).join(' ');

  return (
    <Box
      ref={mapRef}
      className={classes}
      style={{ aspectRatio: `${String(surface.width)} / ${String(surface.height)}` }}
      onPointerDown={drag.onMapDown}
    >
      {children}
      <Box
        role="slider"
        tabIndex={0}
        aria-label={label ?? navigation.mapLabel}
        aria-valuemin={0}
        aria-valuemax={surface.width}
        aria-valuenow={Math.round(drag.shown.x)}
        aria-valuetext={viewportText(drag.shown, surface, navigation)}
        className="navigator__viewport focus-ring-inset"
        style={viewportBoxOf(drag.shown, surface)}
        onPointerDown={drag.onViewportDown}
        onKeyDown={(event) => {
          const move = keyMove(event.key, event.shiftKey, drag.shown, unit);
          if (move === null) return;
          event.preventDefault();
          onViewportChange(moveViewport(drag.shown, surface, move.dx, move.dy));
        }}
      />
    </Box>
  );
};

export { Navigator };
