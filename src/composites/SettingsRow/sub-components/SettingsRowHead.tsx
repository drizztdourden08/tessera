/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { HIT_AREA_CLASS } from '../../../primitives/dom/hit-area.constants';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { RESET_ICON_SIZE } from '../SettingsRow.constants';
import type { SettingsRowHeadProps } from './SettingsRowHead.type';

const SettingsRowHead = (props: SettingsRowHeadProps) => {
  const { lead, title, badge, changed = false, onReset } = props;
  const { settings } = useTesseraStrings();
  return (
    <Box className="settings-row__head">
      {lead}
      {badge != null && <Box as="span" className="settings-row__badge">{badge}</Box>}
      {changed && <Badge variant="dot" color="primary" label={settings.changed} className="settings-row__changed" />}
      {changed && onReset && (
        <IconButton
          size="xs"
          className={`settings-row__reset ${HIT_AREA_CLASS}`}
          label={settings.resetRow(title)}
          hint={{ label: '', description: settings.resetHint }}
          onClick={onReset}
        >
          <Icon name="rotate-ccw" size={RESET_ICON_SIZE} />
        </IconButton>
      )}
    </Box>
  );
};

export { SettingsRowHead };
