/* @layer renderer-components @kind component */
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { InlineCreateNameProps } from './InlineCreateName.type';

const InlineCreateName = (props: InlineCreateNameProps) => {
  const { value, onChange, onKeyDown, placeholder, label, errorId } = props;
  const { records } = useTesseraStrings();
  const shownPlaceholder = placeholder ?? records.namePlaceholder;
  return (
    <TextInput
      type="text"
      className="inline-create-form__name"
      placeholder={shownPlaceholder}
      aria-label={label ?? shownPlaceholder}
      aria-describedby={errorId}
      value={value}
      invalid={errorId != null}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
};

export { InlineCreateName };
