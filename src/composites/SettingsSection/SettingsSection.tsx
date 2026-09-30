/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Paragraph } from '../../primitives/text-elements';
import { SettingsSectionRows } from './sub-components/SettingsSectionRows';
import './SettingsSection.css';
import { type SettingsSectionProps } from './SettingsSection.type';

const SettingsSection = (props: SettingsSectionProps) => {
  const { title, description, children, rows, renderLock, flashKey, anchor, inset = false, className = '' } = props;
  const classes = ['settings-section', inset ? 'settings-section--inset' : '', className].filter(Boolean).join(' ');

  return (
    <Box as="section" className={classes} data-section={anchor}>
      {(title !== undefined || description !== undefined) && (
        <Box className="settings-section__header">
          {title && <Text as="h3" className="settings-section__title">{title}</Text>}
          {description && <Paragraph tone="muted" className="settings-section__desc">{description}</Paragraph>}
        </Box>
      )}
      <Box className="settings-section__content">
        {rows ? <SettingsSectionRows rows={rows} renderLock={renderLock} flashKey={flashKey} /> : children}
      </Box>
    </Box>
  );
};

export {
  SettingsSection,
};
