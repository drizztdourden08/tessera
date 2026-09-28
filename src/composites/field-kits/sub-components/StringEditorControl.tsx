/* @layer renderer-components @kind component */
import { TextInput } from '../../../primitives/TextInput';
import { toText } from '../toText';
import type { EditorControlProps } from '../registry.type';

const StringEditorControl = (props: EditorControlProps) => {
  const { field, value, onChange, disabled } = props;
  return (
    <TextInput
      value={toText(value)}
      placeholder={field.label}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export { StringEditorControl };
