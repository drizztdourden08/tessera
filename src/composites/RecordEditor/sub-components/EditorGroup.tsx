/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { EditorRow } from './EditorRow';
import type { EditorGroupProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const EditorGroup = (props: EditorGroupProps) => {
  const { group, binding, depth } = props;
  return (
    <Box as="fieldset" className="record-editor__group">
      {group.label != null && (
        <Text as="legend" className="record-editor__legend">{group.label}</Text>
      )}
      {group.fields.map((field) => (
        <EditorRow key={field.path} field={field} binding={binding} depth={depth} />
      ))}
    </Box>
  );
};

export { EditorGroup };
