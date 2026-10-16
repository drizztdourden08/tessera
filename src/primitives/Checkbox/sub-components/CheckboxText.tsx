/* @layer renderer-components @kind component */
import { HelpTip } from '../../field-control/HelpTip';
import { Span } from '../../text-elements';
import type { CheckboxTextProps } from './CheckboxText.type';

const CheckboxText = (props: CheckboxTextProps) => {
  const { id, label, help } = props;
  if (label == null) return null;
  return (
    <>
      <Span id={id} tone="dim" className="checkbox__label">{label}</Span>
      <HelpTip help={help} />
    </>
  );
};

export { CheckboxText };
