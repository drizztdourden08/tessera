/* @layer renderer-components @kind component */
import { TextInput } from '../../../primitives/TextInput';
import { toText } from '../toText';
import type { IdInputProps } from './IdInput.type';

const IdInput = (props: IdInputProps) => {
  const { placeholder, value, disabled, onChange } = props;
  return (
    <TextInput
      value={toText(value)}
      placeholder={placeholder}
      disabled={disabled}
      spellCheck={false}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export { IdInput };
