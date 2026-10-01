/* @layer renderer-components @kind component */
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { createStructuredKit } from './StructuredKit';
import type { EditorControlProps } from './registry.type';

const EditorControl = (props: EditorControlProps) => {
  const { field } = props;
  const { records } = useTesseraStrings();
  return <Text className="field-kit__placeholder" title={field.path}>{records.editViaDetail}</Text>;
};

createStructuredKit('union', EditorControl);
