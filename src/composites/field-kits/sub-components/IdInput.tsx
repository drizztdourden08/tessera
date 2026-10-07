/* @layer renderer-components @kind component */
import { TextInput } from '../../../primitives/TextInput';
import { controlName } from '../../../primitives/field-control/control-name';
import { toText } from '../to-text';
import type { IdInputProps } from './IdInput.type';

const IdInput = (props: IdInputProps) => {
  const { placeholder, value, disabled, onChange } = props;
  return (
    <TextInput
      {...controlName(props)}
      value={toText(value)}
      placeholder={placeholder}
      disabled={disabled}
      spellCheck={false}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export { IdInput };
