/* @layer renderer-components @kind component */
import { Shortcut } from '../../../../../primitives/Shortcut';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../../../primitives/text-elements';
import { ControlMenuRow } from '../../../../ControlMenu';
import { SHORTCUTS } from '../WidgetOptions.constants';

const ShortcutsList = () => {
  const { widgets } = useTesseraStrings();
  return SHORTCUTS.map(({ keys, gesture, does }) => (
    <ControlMenuRow key={does} label={widgets[does]}>
      {keys && <Shortcut keys={keys} size="xs" />}
      {gesture && <Span className="widget-shortcuts__gesture">{widgets[gesture]}</Span>}
    </ControlMenuRow>
  ));
};

export { ShortcutsList };
