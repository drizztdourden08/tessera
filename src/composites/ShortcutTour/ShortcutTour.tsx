/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { KeyboardLayout, cssVars } from '../KeyboardLayout';
import { tourLabel } from './behavior/tour-label';
import { useShortcutTour } from './behavior/useShortcutTour';
import { viewStyle } from './behavior/view-style';
import { TourMouse } from './sub-components/TourMouse';
import type { ShortcutTourProps } from './ShortcutTour.type';
import './ShortcutTour.css';

const ShortcutTour = (props: ShortcutTourProps) => {
  const { keys, mouse, zoomOut = true, loop = true, speed = 1, size = 'full', className, style, ...rest } = props;
  const { viewportRef, worldRef, mouseRef, onKeyRects, view, heldKeys, mouseHeld } = useShortcutTour({ keys, mouse, zoomOut, loop, size });

  return (
    <Box
      ref={viewportRef}
      role="img"
      aria-label={tourLabel(keys, mouse)}
      className={className ? `shortcut-tour ${className}` : 'shortcut-tour'}
      style={{ ...style, ...cssVars({ '--shortcut-tour-speed': speed }) }}
      {...rest}
    >
      <Box ref={worldRef} className={view ? 'shortcut-tour__world shortcut-tour__world--ready' : 'shortcut-tour__world'} style={viewStyle(view)}>
        <KeyboardLayout size={size} pressed={heldKeys} onKeyRects={onKeyRects} aria-hidden />
        {mouse ? <TourMouse ref={mouseRef} button={mouse} pressed={mouseHeld} /> : null}
      </Box>
    </Box>
  );
};

export { ShortcutTour };
