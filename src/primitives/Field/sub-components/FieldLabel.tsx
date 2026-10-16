/* @layer renderer-components @kind component */
import { HelpTip } from '../../field-control/HelpTip';
import { Span } from '../../text-elements';
import type { FieldLabelProps } from './FieldLabel.type';

const FieldLabel = (props: FieldLabelProps) => {
  const { id, htmlFor, required, help, children } = props;
  const label = (
    <label id={id} className="field__label" htmlFor={htmlFor}>
      {children}
      {required && <Span tone="danger" className="field__required">*</Span>}
    </label>
  );
  if (help == null || help === '') return label;
  return (
    <span className="field__head">
      {label}
      <HelpTip help={help} />
    </span>
  );
};

export { FieldLabel };
