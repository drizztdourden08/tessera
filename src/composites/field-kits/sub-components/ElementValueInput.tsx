/* @layer renderer-components @kind component */
import { NumberInput } from '../../../primitives/NumberInput';
import { Select } from '../../../primitives/Select';
import { TextInput } from '../../../primitives/TextInput';
import { toNumber } from '../to-number';
import { toText } from '../to-text';
import type { ElementValueInputProps } from './ElementValueInput.type';

const ElementValueInput = (props: ElementValueInputProps) => {
  const { element, value, placeholder, onChange } = props;

  if (element?.kind === 'number') {
    const parsed = toNumber(value);
    return (
      <NumberInput
        value={Number.isFinite(parsed) ? parsed : ''}
        placeholder={placeholder}
        onChange={(entered) => onChange(Number.isNaN(entered) ? null : entered)}
      />
    );
  }

  if (element?.kind === 'enum' && element.options?.length) {
    return (
      <Select
        value={toText(value)}
        options={element.options.map((option) => ({ value: option, label: option }))}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }

  return (
    <TextInput
      value={toText(value)}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export { ElementValueInput };
