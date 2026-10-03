/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Tooltip } from '../../../primitives/Tooltip';
import { Span } from '../../../primitives/text-elements';
import { HINT_ICON_SIZE } from '../SettingsRow.constants';
import type { SettingsRowCompactTextProps } from './SettingsRowCompactText.type';

const SettingsRowCompactText = (props: SettingsRowCompactTextProps) => {
  const { title, description } = props;
  const label = <Span className="settings-row__title">{title}</Span>;
  if (description === undefined) return <Box className="settings-row__text">{label}</Box>;
  return (
    <Box className="settings-row__text">
      <Tooltip content={description} className="settings-row__about">
        {label}
        <Icon name="info" size={HINT_ICON_SIZE} className="settings-row__about-icon" />
      </Tooltip>
      <Span className="settings-row__sr">{description}</Span>
    </Box>
  );
};

export { SettingsRowCompactText };
