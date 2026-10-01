/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { ConfirmIconButton } from '../../ConfirmIconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { SettingsGroupListHeadingProps } from './SettingsGroupListHeading.type';

const SettingsGroupListHeading = (props: SettingsGroupListHeadingProps) => {
  const { title, changedCount, onReset } = props;
  const { panels } = useTesseraStrings();
  const heading = <Text as="h2" className="settings-group-list__title">{title}</Text>;
  if (!onReset) return heading;

  const resettable = changedCount > 0;
  return (
    <Box className="settings-group-list__heading">
      {heading}
      <ConfirmIconButton
        className="settings-group-list__reset"
        icon={<Icon name="rotate-ccw" size={13} />}
        label={resettable ? panels.resetSection(changedCount) : panels.sectionAtDefaults}
        confirmLabel={panels.resetToDefaults}
        cancelLabel={panels.keepSettings}
        disabled={!resettable}
        onConfirm={onReset}
      />
    </Box>
  );
};

export { SettingsGroupListHeading };
