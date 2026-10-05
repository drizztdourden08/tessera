/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { InputAdornmentView } from '../../field-control/InputAdornmentView';
import { Spinner } from '../../Spinner';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { ComboboxFieldProps } from './ComboboxField.type';

const ComboboxEnd = <T,>(props: ComboboxFieldProps<T>) => {
  const { box, look } = props;
  const { field } = box;
  const clearable = !field.disabled && box.min === 0 && box.displays.length > 0;
  const { fields } = useTesseraStrings();

  return (
    <>
      {look.loading === true && <Spinner size="sm" className="combobox__spinner" />}
      {clearable && (
        <InputAdornmentView
          className="combobox__clear"
          adornment={{ icon: <Icon name="x" />, label: fields.clear, onClick: box.clear }}
          size={field.size}
          focusable={false}
        />
      )}
      {!box.free && <Icon name="chevron-down" className="combobox__chevron" />}
    </>
  );
};

export { ComboboxEnd };
