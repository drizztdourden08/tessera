/* @layer renderer-components @kind component */
import { Box } from '../../../../../primitives/Box';
import { Glyph } from '../../../../../primitives/Glyph';
import { Icon } from '../../../../../primitives/Icon';
import { IconButton } from '../../../../../primitives/IconButton';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../../../primitives/text-elements';
import type { OptionsHeaderProps } from '../WidgetOptions.type';

const OptionsHeader = (props: OptionsHeaderProps) => {
  const { title, shortcutsOpen, onToggleShortcuts, onReset, onClose } = props;
  const { common, widgets } = useTesseraStrings();
  const keysLabel = shortcutsOpen ? widgets.hideShortcuts : widgets.showShortcuts;

  return (
    <Box className="widget-options__header">
      <Span className="widget-options__title">{title}</Span>
      <Box className="widget-options__actions">
        <IconButton
          size="xs"
          label={keysLabel}
          active={shortcutsOpen}
          hint={{ label: keysLabel, description: widgets.shortcutsHint }}
          onClick={onToggleShortcuts}
        >
          <Icon name="keyboard" size={12} />
        </IconButton>
        <IconButton size="xs" label={widgets.resetWidget} hint={{ label: widgets.resetWidget, description: widgets.resetHint }} onClick={onReset}>
          <Icon name="rotate-ccw" size={12} />
        </IconButton>
        <IconButton size="xs" label={common.close} hint={{ label: common.close, description: widgets.closeHint }} onClick={onClose}>
          <Glyph name="close" size={12} />
        </IconButton>
      </Box>
    </Box>
  );
};

export { OptionsHeader };
