/* @layer renderer-components @kind component */
import { NumberInput } from '../../../primitives/NumberInput';
import { inputValue } from '../input-value';
import type { EditorControlProps } from '../registry.type';

const NumberEditorControl = (props: EditorControlProps) => {
  const { field, value, onChange, disabled, bounds } = props;
  return (
    <NumberInput
      value={inputValue(value)}
      placeholder={field.label}
      min={bounds?.min}
      max={bounds?.max}
      step={bounds?.step}
      disabled={disabled}
      onChange={(entered) => onChange(Number.isNaN(entered) ? null : entered)}
    />
  );
};

export { NumberEditorControl };
