/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { SettingsRowLine } from './SettingsRowLine';
import type { SettingsRowTextProps } from './SettingsRowText.type';

const SettingsRowText = (props: SettingsRowTextProps) => {
  const { title, ...line } = props;
  return (
    <Box className="settings-row__text">
      <Span className="settings-row__title">{title}</Span>
      <SettingsRowLine {...line} />
    </Box>
  );
};

export { SettingsRowText };
