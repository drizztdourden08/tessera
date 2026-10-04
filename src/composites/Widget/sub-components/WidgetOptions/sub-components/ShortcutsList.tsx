/* @layer renderer-components @kind component */
import { Box } from '../../../../../primitives/Box';
import { Icon } from '../../../../../primitives/Icon';
import { Shortcut } from '../../../../../primitives/Shortcut';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../../../primitives/text-elements';
import { ControlMenuRow } from '../../../../ControlMenu';
import { SHORTCUTS } from '../WidgetOptions.constants';

const ShortcutsList = () => {
  const { widgets } = useTesseraStrings();
  return (
    <Box className="widget-shortcuts">
      {SHORTCUTS.map(({ keys, gesture, does }) => (
        <ControlMenuRow key={does} label={widgets[does]}>
          {keys && <Shortcut keys={keys} size="xs" />}
          {gesture && (
            <Span className="widget-shortcuts__gesture">
              {!keys && <Icon name="move" size={12} />}
              {widgets[gesture]}
            </Span>
          )}
        </ControlMenuRow>
      ))}
    </Box>
  );
};

export { ShortcutsList };
