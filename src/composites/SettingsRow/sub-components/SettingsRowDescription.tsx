/* @layer renderer-components @kind component */
import { FoldText } from '../../../primitives/FoldText';
import { Small } from '../../../primitives/text-elements';
import type { SettingsRowDescriptionProps } from './SettingsRowDescription.type';

const SettingsRowDescription = ({ text, lines, overflow }: SettingsRowDescriptionProps) => (
  <FoldText lines={lines} overflow={overflow} hint={text}>
    <Small tone="dim" className="settings-row__description">{text}</Small>
  </FoldText>
);

export { SettingsRowDescription };
