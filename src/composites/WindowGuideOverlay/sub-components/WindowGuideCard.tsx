/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { ShortcutList } from '../../ShortcutList';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
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
        <ShortcutList items={hints.map((hint) => ({ keys: hint.keys, description: hint.label }))} className="window-guide__hints" />
      )}
    </Box>
  );
};

export { WindowGuideCard };
