/* @layer renderer-components @kind component */
import { Text } from '../../../primitives/Text';
import { OPTIONAL } from './FieldLabel.constants';
import type { FieldLabelProps } from './FieldLabel.type';

const FieldLabel = ({ field }: FieldLabelProps) => (
  <>
    {field.label}
    {field.optional && <Text as="span" className="record-editor__optional">{OPTIONAL}</Text>}
  </>
);

export { FieldLabel };
