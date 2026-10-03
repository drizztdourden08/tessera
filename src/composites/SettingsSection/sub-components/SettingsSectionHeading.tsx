/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ConfirmIconButton } from '../../ConfirmIconButton';
import { RESET_ICON_SIZE } from '../SettingsSection.constants';
import type { SettingsSectionHeadingProps } from './SettingsSectionHeading.type';

const SettingsSectionHeading = (props: SettingsSectionHeadingProps) => {
  const { title, changedCount, onReset } = props;
  const { panels } = useTesseraStrings();
  const resettable = changedCount > 0;
  return (
    <Box className="settings-section__heading">
      <Text as="h2" className="settings-section__title">{title}</Text>
      {onReset && (
        <ConfirmIconButton
          className="settings-section__reset"
          icon={<Icon name="rotate-ccw" size={RESET_ICON_SIZE} />}
          label={resettable ? panels.resetSection(changedCount) : panels.sectionAtDefaults}
          confirmLabel={panels.resetToDefaults}
          cancelLabel={panels.keepSettings}
          disabled={!resettable}
          onConfirm={onReset}
          placement="end"
        />
      )}
    </Box>
  );
};

export { SettingsSectionHeading };
