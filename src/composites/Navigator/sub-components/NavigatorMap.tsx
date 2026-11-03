/* @layer renderer-components @kind component */
import '../../../theme/focus-ring.css';
import '../../../theme/visually-hidden.css';
import { useId, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { navigatorKey } from '../behavior/navigator-key';
import { navigatorSteps } from '../behavior/navigator-steps';
import { useNavigatorDrag } from '../behavior/useNavigatorDrag';
import { useNavigatorWheel } from '../behavior/useNavigatorWheel';
import { viewportBoxOf } from '../behavior/viewport-box-of';
import { viewportText } from '../behavior/viewport-text';
import { NavigatorOverlays } from './NavigatorOverlays';
import type { NavigatorProps } from '../Navigator.type';

const NavigatorMap = (props: NavigatorProps) => {
  const { surface, viewport, onViewportChange, children, label, step, bigStep, unclamped, overlays, onOverlayPress, onWheelZoom, onKey, describe, className } = props;
  const { navigation } = useTesseraStrings();
  const mapRef = useRef<HTMLElement>(null);
  const describedBy = useId();
  const drag = useNavigatorDrag({ surface, viewport, onViewportChange, unclamped }, mapRef);
  useNavigatorWheel({ mapRef, surface, onWheelZoom });
  const steps = navigatorSteps({ surface, step, bigStep });
  const classes = ['navigator', drag.dragging && 'navigator--dragging', className].filter(Boolean).join(' ');

  return (
    <Box
      ref={mapRef}
      className={classes}
      style={{ aspectRatio: `${String(surface.width)} / ${String(surface.height)}` }}
      onPointerDown={drag.onMapDown}
    >
      {children}
      {overlays && <NavigatorOverlays overlays={overlays} surface={surface} onPress={onOverlayPress} />}
      <Box
        role="slider"
        tabIndex={0}
        aria-label={label ?? navigation.mapLabel}
        aria-valuemin={unclamped ? -drag.shown.width : 0}
        aria-valuemax={surface.width}
        aria-valuenow={Math.round(drag.shown.x)}
        aria-valuetext={viewportText(drag.shown, surface, navigation)}
        aria-describedby={describe === undefined ? undefined : describedBy}
        className="navigator__viewport focus-ring-inset"
        style={viewportBoxOf(drag.shown, surface)}
        onPointerDown={drag.onViewportDown}
        onKeyDown={navigatorKey({ shown: drag.shown, surface, steps, unclamped, onKey, onViewportChange })}
      />
      {describe !== undefined && <Box id={describedBy} className="visually-hidden">{describe}</Box>}
    </Box>
  );
};

export { NavigatorMap };
