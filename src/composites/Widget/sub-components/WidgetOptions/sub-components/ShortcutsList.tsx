/* @layer renderer-components @kind component */
import { Box } from '../../../../../primitives/Box';
import { Shortcut } from '../../../../../primitives/Shortcut';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small, Span } from '../../../../../primitives/text-elements';
import { SHORTCUTS } from '../WidgetOptions.constants';

const ShortcutsList = () => {
  const { widgets } = useTesseraStrings();
  return (
    <Box className="widget-shortcuts">
      {SHORTCUTS.map(({ keys, gesture, does }) => (
        <Box key={does} className="widget-shortcuts__row">
          <Box className="widget-shortcuts__keys">
            {keys && <Shortcut keys={keys} size="xs" />}
            {gesture && <Span className="widget-shortcuts__gesture">{widgets[gesture]}</Span>}
          </Box>
          <Small tone="muted" className="widget-shortcuts__does">{widgets[does]}</Small>
        </Box>
      ))}
    </Box>
  );
};

export { ShortcutsList };
