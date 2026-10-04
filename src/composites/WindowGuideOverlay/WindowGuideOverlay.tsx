/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../primitives/text-elements';
import { guideHints } from './behavior/guide-hints';
import { WindowGuideBeside } from './sub-components/WindowGuideBeside';
import { WindowGuideCard } from './sub-components/WindowGuideCard';
import { NO_HINTS } from './WindowGuideOverlay.constants';
import type { WindowGuideOverlayProps } from './WindowGuideOverlay.type';
import './WindowGuideOverlay.css';

const WindowGuideOverlay = (props: WindowGuideOverlayProps) => {
  const { open, mode, snapping, hints = NO_HINTS, defaultHints = true, pointer, className } = props;
  const { widgets } = useTesseraStrings();
  const rows = defaultHints ? [...guideHints(mode, widgets), ...hints] : hints;
  const title = mode === 'moving' ? widgets.guideMoving : widgets.guideResizing;
  const cls = ['window-guide', open && 'window-guide--open', className].filter(Boolean).join(' ');
  const card = <WindowGuideCard mode={mode} title={title} snapping={snapping} hints={rows} />;

  return (
    <Box className={cls} data-mode={mode}>
      {pointer
        ? <WindowGuideBeside pointer={pointer}>{card}</WindowGuideBeside>
        : <Box className="window-guide__scrim" aria-hidden>{card}</Box>}
      <Span className="window-guide__status" role="status" aria-live="polite">
        {open ? widgets.guideAnnounce(title, snapping) : ''}
      </Span>
    </Box>
  );
};

export { WindowGuideOverlay };
