/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../primitives/text-elements';
import { guideHints } from './behavior/guide-hints';
import { WindowGuideCard } from './sub-components/WindowGuideCard';
import { NO_HINTS } from './WindowGuideOverlay.constants';
import type { WindowGuideOverlayProps } from './WindowGuideOverlay.type';
import './WindowGuideOverlay.css';

const WindowGuideOverlay = (props: WindowGuideOverlayProps) => {
  const { open, mode, snapping, hints = NO_HINTS, defaultHints = true, className } = props;
  const { widgets } = useTesseraStrings();
  const rows = defaultHints ? [...guideHints(mode, widgets), ...hints] : hints;
  const title = mode === 'moving' ? widgets.guideMoving : widgets.guideResizing;
  const cls = ['window-guide', open && 'window-guide--open', className].filter(Boolean).join(' ');

  return (
    <Box className={cls} data-mode={mode}>
      <Box className="window-guide__scrim" aria-hidden>
        <WindowGuideCard mode={mode} title={title} snapping={snapping} hints={rows} />
      </Box>
      <Span className="window-guide__status" role="status" aria-live="polite">
        {open ? widgets.guideAnnounce(title, snapping) : ''}
      </Span>
    </Box>
  );
};

export { WindowGuideOverlay };
