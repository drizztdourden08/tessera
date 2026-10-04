/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { SettingsRowDescription } from './SettingsRowDescription';
import { SettingsRowHead } from './SettingsRowHead';
import { SettingsRowLine } from './SettingsRowLine';
import type { SettingsRowTextProps } from './SettingsRowText.type';

const SettingsRowText = (props: SettingsRowTextProps) => {
  const { title, badge, changed, onReset, description, descriptionLines, ...line } = props;
  return (
    <Box className="settings-row__text">
      <SettingsRowHead lead={<Span className="settings-row__title">{title}</Span>} title={title} badge={badge} changed={changed} onReset={onReset} />
      {description !== undefined && <SettingsRowDescription text={description} lines={descriptionLines} />}
      <SettingsRowLine {...line} quiet={description !== undefined} />
    </Box>
  );
};

export { SettingsRowText };
