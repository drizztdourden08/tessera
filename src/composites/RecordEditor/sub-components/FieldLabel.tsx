/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { OPTIONAL } from './FieldLabel.constants';
import type { FieldLabelProps } from './FieldLabel.type';

const FieldLabel = ({ field }: FieldLabelProps) => (
  <>
    {field.label}
    {field.optional && <Span tone="muted" className="record-editor__optional">{OPTIONAL}</Span>}
  </>
);

export { FieldLabel };
