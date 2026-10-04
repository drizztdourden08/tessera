/* @layer renderer-components @kind component */
import { Span, Strong } from '../../../primitives/text-elements';
import type { SettingsRowHintTextProps } from './SettingsRowHintText.type';

const SettingsRowHintText = (props: SettingsRowHintTextProps) => {
  const { hint } = props;
  return (
    <>
      {hint.label !== '' && <><Strong className="settings-row__hint-label">{hint.label}</Strong>{' '}</>}
      <Span tone="muted">{hint.description}</Span>
    </>
  );
};

export { SettingsRowHintText };
