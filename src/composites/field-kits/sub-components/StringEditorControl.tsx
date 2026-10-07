/* @layer renderer-components @kind component */
import { controlName } from '../../../primitives/field-control/control-name';
import { TextInput } from '../../../primitives/TextInput';
import { toText } from '../to-text';
import type { EditorControlProps } from '../registry.type';

const StringEditorControl = (props: EditorControlProps) => {
  const { field, value, onChange, disabled } = props;
  return (
    <TextInput
      {...controlName(props)}
      value={toText(value)}
      placeholder={field.label}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export { StringEditorControl };
