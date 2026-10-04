/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Shortcut } from '../../../primitives/Shortcut';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small, Span } from '../../../primitives/text-elements';
import { MODE_ICONS, MODE_ICON_SIZE, SNAP_ICON_SIZE } from '../WindowGuideOverlay.constants';
import type { WindowGuideCardProps } from '../WindowGuideOverlay.type';
import '../../../theme/glass-panel.css';

const WindowGuideCard = (props: WindowGuideCardProps) => {
  const { mode, title, snapping, hints } = props;
  const { widgets } = useTesseraStrings();

  return (
    <Box className="glass-panel window-guide__card">
      <Box className="window-guide__head">
        <Icon name={MODE_ICONS[mode]} size={MODE_ICON_SIZE} className="window-guide__mode-icon" />
        <Span className="window-guide__title">{title}</Span>
      </Box>
      <Span className="window-guide__snap" data-off={snapping ? undefined : true}>
        <Icon name="magnet" size={SNAP_ICON_SIZE} />
        {snapping ? widgets.guideSnapping : widgets.guideSnappingOff}
      </Span>
      {hints.length > 0 && (
        <Box className="window-guide__hints">
          {hints.map((hint) => (
            <Box key={`${hint.keys.join('+')} ${hint.label}`} className="window-guide__hint">
              <Shortcut keys={hint.keys} size="xs" />
              <Small tone="muted">{hint.label}</Small>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export { WindowGuideCard };
