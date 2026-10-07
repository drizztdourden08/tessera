/* @layer renderer-components @kind component */
import { FoldText } from '../../../primitives/fold-text/FoldText';
import { Small } from '../../../primitives/text-elements';
import type { SettingsRowDescriptionProps } from './SettingsRowDescription.type';

const SettingsRowDescription = ({ text, lines }: SettingsRowDescriptionProps) => (
  <FoldText lines={lines}>
    <Small tone="dim" className="settings-row__description">{text}</Small>
  </FoldText>
);

export { SettingsRowDescription };
