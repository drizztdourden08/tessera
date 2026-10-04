/* @layer renderer-components @kind component */
import { NumberInput } from '../../../primitives/NumberInput';
import { NumberStepper } from '../../../primitives/NumberStepper';
import { Select } from '../../../primitives/Select';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { KeyValueValueProps } from '../KeyValueEditor.type';

const KeyValueValue = ({ value, name, look, onChange }: KeyValueValueProps) => {
  const { options } = useTesseraStrings();
  const label = options.valueOf(name);
  const { valueKind = 'count', min, max, disabled } = look;
  if (valueKind === 'count') {
    return <NumberStepper value={Number(value)} min={min} max={max} disabled={disabled} ariaLabel={label} onChange={onChange} />;
  }
  if (valueKind === 'number') {
    return <NumberInput value={Number(value)} min={min} max={max} disabled={disabled} aria-label={label} onChange={onChange} />;
  }
  if (valueKind === 'select') {
    const choices = (look.options ?? []).map((option) => ({ value: option, label: option }));
    return <Select value={String(value)} options={choices} disabled={disabled} aria-label={label} onChange={onChange} />;
  }
  return <TextInput value={String(value)} disabled={disabled} aria-label={label} onChange={(event) => onChange(event.target.value)} />;
};

export { KeyValueValue };
