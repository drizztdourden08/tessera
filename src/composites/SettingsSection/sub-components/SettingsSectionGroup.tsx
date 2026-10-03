/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { Small } from '../../../primitives/text-elements';
import { flashClass } from '../behavior/flash-class';
import { SettingsSectionRows } from './SettingsSectionRows';
import type { SettingsSectionGroupProps } from './SettingsSectionGroup.type';

const SettingsSectionGroup = (props: SettingsSectionGroupProps) => {
  const { group, ...look } = props;
  const classes = ['settings-section__group', flashClass(group.id, look.flash)].filter(Boolean).join(' ');
  return (
    <Box className={classes} data-section={group.id}>
      {group.title !== undefined && <Text as="h3" className="settings-section__group-title">{group.title}</Text>}
      {group.description !== undefined && <Small tone="dim">{group.description}</Small>}
      <Box className="settings-section__box">
        <SettingsSectionRows rows={group.rows} {...look} />
      </Box>
    </Box>
  );
};

export { SettingsSectionGroup };
