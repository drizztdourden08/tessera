/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Overlay } from '../../primitives/Overlay';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../primitives/text-elements';
import { guideHints } from './behavior/guide-hints';
import { guideStatus } from './behavior/guide-status';
import { guideTitle } from './behavior/guide-title';
import { WindowGuideBeside } from './sub-components/WindowGuideBeside';
import { WindowGuideCard } from './sub-components/WindowGuideCard';
import { NO_HINTS } from './WindowGuideOverlay.constants';
import type { WindowGuideOverlayProps } from './WindowGuideOverlay.type';
import './WindowGuideOverlay.css';

const WindowGuideOverlay = (props: WindowGuideOverlayProps) => {
  const { open, mode, snapping, title: customTitle, showSnapping = true, hints = NO_HINTS, defaultHints = true, pointer, className } = props;
  const { widgets } = useTesseraStrings();
  const rows = defaultHints ? [...guideHints(mode, widgets), ...hints] : hints;
  const title = guideTitle(mode, widgets, customTitle);
  const cls = ['window-guide', open && 'window-guide--open', className].filter(Boolean).join(' ');
  const card = <WindowGuideCard mode={mode} title={title} snapping={snapping} showSnapping={showSnapping} hints={rows} />;

  return (
    <Box className={cls} data-mode={mode}>
      {pointer
        ? <WindowGuideBeside pointer={pointer}>{card}</WindowGuideBeside>
        : <Overlay visible={open} keepMounted tone="clear" aria-hidden className="window-guide__layer">{card}</Overlay>}
      <Span className="window-guide__status" role="status" aria-live="polite">
        {open ? guideStatus(title, snapping, showSnapping, widgets) : ''}
      </Span>
    </Box>
  );
};

export { WindowGuideOverlay };
