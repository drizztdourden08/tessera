/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { clipRect } from '../behavior/clip-rect';
import { viewportBoxOf } from '../behavior/viewport-box-of';
import type { NavigatorOverlaysProps } from './NavigatorOverlays.type';

const NavigatorOverlays = (props: NavigatorOverlaysProps) => {
  const { overlays, surface, onPress } = props;
  return (
    <Box className="navigator__overlays" aria-hidden="true">
      {overlays.map((overlay) => (
        <Box
          key={overlay.id}
          className={`navigator__overlay navigator__overlay--${overlay.kind}`}
          data-interactive={overlay.interactive ? true : undefined}
          title={overlay.interactive ? overlay.label : undefined}
          style={viewportBoxOf(clipRect(overlay.rect, surface), surface)}
          onPointerDown={overlay.interactive ? (event) => {
            event.stopPropagation();
            onPress?.(overlay.id);
          } : undefined}
        />
      ))}
    </Box>
  );
};

export { NavigatorOverlays };
