/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { FieldLabelProps } from './FieldLabel.type';

const FieldLabel = ({ field }: FieldLabelProps) => {
  const { records } = useTesseraStrings();
  return (
    <>
      {field.label}
      {field.optional && <Span tone="muted" className="record-editor__optional">{records.optional}</Span>}
    </>
  );
};

export { FieldLabel };
