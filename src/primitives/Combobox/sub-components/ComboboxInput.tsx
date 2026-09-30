/* @layer renderer-components @kind component */
import { activeOptionId } from '../../listbox/active-option-id';
import { DEFAULT_PLACEHOLDER } from '../Combobox.constants';
import type { ComboboxFieldProps } from './ComboboxField.type';

const ComboboxInput = <T,>(props: ComboboxFieldProps<T>) => {
  const { box, look } = props;
  const { drop, model, control, field } = box;
  const chipsShown = box.multi && box.displays.length > 0;

  return (
    <input
      ref={box.inputRef}
      id={control.id}
      className={`combobox__input${box.showValue ? ' combobox__input--behind' : ''}`}
      type="text"
      role="combobox"
      autoComplete="off"
      aria-autocomplete="list"
      aria-expanded={drop.open}
      aria-controls={drop.open ? model.listId : undefined}
      aria-activedescendant={activeOptionId(drop.open, model)}
      aria-invalid={field.invalid || undefined}
      aria-describedby={control.describedBy}
      aria-label={look['aria-label']}
      aria-labelledby={look['aria-labelledby']}
      placeholder={chipsShown ? '' : look.placeholder ?? DEFAULT_PLACEHOLDER}
      value={box.inputValue}
      disabled={field.disabled}
      onChange={(event) => box.type(event.target.value)}
      onKeyDown={box.onKeyDown}
      onFocus={(event) => {
        box.focusChange(true);
        if (!box.multi) event.currentTarget.select();
      }}
      onBlur={() => box.focusChange(false)}
    />
  );
};

export { ComboboxInput };
