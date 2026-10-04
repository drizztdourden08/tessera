/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Paragraph } from '../../primitives/text-elements';
import { countChanged } from './behavior/count-changed';
import { flashClass } from './behavior/flash-class';
import { groupsOf } from './behavior/groups-of';
import { SettingsSectionGroup } from './sub-components/SettingsSectionGroup';
import { SettingsSectionHeading } from './sub-components/SettingsSectionHeading';
import type { SettingsSectionProps } from './SettingsSection.type';
import '../../theme/search-hit.css';
import './SettingsSection.css';

const SettingsSection = (props: SettingsSectionProps) => {
  const { id, title, description, children, onReset, flash, renderLock, compact = false, readOnly = false, className = '' } = props;
  const changedCount = props.changedCount ?? countChanged(props);
  const look = { flash, renderLock, compact, readOnly };
  const classes = ['settings-section', compact && 'settings-section--compact', flashClass(id, flash), className].filter(Boolean).join(' ');

  return (
    <Box as="section" className={classes} data-section={id}>
      {title !== undefined && <SettingsSectionHeading title={title} changedCount={changedCount} onReset={onReset} />}
      {description !== undefined && <Paragraph tone="muted" className="settings-section__description">{description}</Paragraph>}
      {groupsOf(props).map((group, index) => <SettingsSectionGroup key={group.id ?? index} group={group} {...look} />)}
      {children !== undefined && <Box className="settings-section__box settings-section__box--content">{children}</Box>}
    </Box>
  );
};

export { SettingsSection };
