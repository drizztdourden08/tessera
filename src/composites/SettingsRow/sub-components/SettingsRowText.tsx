/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Small, Span } from '../../../primitives/text-elements';
import { SettingsRowHint } from './SettingsRowHint';
import type { SettingsRowTextProps } from './SettingsRowText.type';

const SettingsRowText = (props: SettingsRowTextProps) => {
  const { title, description, hintLine, hint, current } = props;
  return (
    <Box className="settings-row__text">
      <Span className="settings-row__title">{title}</Span>
      {description !== undefined && <Small tone="dim" className="settings-row__description">{description}</Small>}
      {hintLine && <SettingsRowHint current={current} idle={hint} />}
    </Box>
  );
};

export { SettingsRowText };
