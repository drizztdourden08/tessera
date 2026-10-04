/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Tooltip } from '../../../primitives/Tooltip';
import { Span } from '../../../primitives/text-elements';
import { HINT_ICON_SIZE } from '../SettingsRow.constants';
import { SettingsRowHead } from './SettingsRowHead';
import type { SettingsRowCompactTextProps } from './SettingsRowCompactText.type';

const SettingsRowCompactText = (props: SettingsRowCompactTextProps) => {
  const { description, ...head } = props;
  const label = <Span className="settings-row__title">{head.title}</Span>;
  if (description === undefined) return <Box className="settings-row__text"><SettingsRowHead lead={label} {...head} /></Box>;
  const lead = (
    <Tooltip content={description} className="settings-row__about">
      {label}
      <Icon name="info" size={HINT_ICON_SIZE} className="settings-row__about-icon" />
    </Tooltip>
  );
  return (
    <Box className="settings-row__text">
      <SettingsRowHead lead={lead} {...head} />
      <Span className="settings-row__sr">{description}</Span>
    </Box>
  );
};

export { SettingsRowCompactText };
