/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import type { SettingsRowHintTextProps } from './SettingsRowHintText.type';

const SettingsRowHintText = (props: SettingsRowHintTextProps) => {
  const { hint } = props;
  return (
    <>
      {hint.label !== '' && <><Span className="settings-row__hint-label">{hint.label}</Span>{' '}</>}
      <Span tone="muted">{hint.description}</Span>
    </>
  );
};

export { SettingsRowHintText };
