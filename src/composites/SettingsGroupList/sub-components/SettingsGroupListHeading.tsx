/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { ConfirmIconButton } from '../../ConfirmIconButton';
import { AT_DEFAULTS_LABEL, CANCEL_LABEL, CONFIRM_LABEL, RESET_LABEL } from '../SettingsGroupList.constants';
import type { SettingsGroupListHeadingProps } from './SettingsGroupListHeading.type';

const SettingsGroupListHeading = (props: SettingsGroupListHeadingProps) => {
  const { title, changedCount, onReset } = props;
  const heading = <Text as="h2" className="settings-group-list__title">{title}</Text>;
  if (!onReset) return heading;

  const resettable = changedCount > 0;
  return (
    <Box className="settings-group-list__heading">
      {heading}
      <ConfirmIconButton
        className="settings-group-list__reset"
        icon={<Icon name="rotate-ccw" size={13} />}
        label={resettable ? `${RESET_LABEL} (${changedCount} changed)` : AT_DEFAULTS_LABEL}
        confirmLabel={CONFIRM_LABEL}
        cancelLabel={CANCEL_LABEL}
        disabled={!resettable}
        onConfirm={onReset}
      />
    </Box>
  );
};

export { SettingsGroupListHeading };
