/* @layer renderer-components @kind util */
import { readField } from './read-field';
import { selectedValues } from './selected-values';
import { valueText } from './value-text';
import type { FieldOf, ListboxValueProps, ValueOf } from './listbox.type';
import type { ValueBinding } from './value-binding.type';

const valueBinding = <T, F extends FieldOf<T>>(
  source: ListboxValueProps<T, F>,
  keyOf: (item: unknown) => string,
  multi: boolean,
): ValueBinding<T, ValueOf<T, F>> => {
  const { valueField, value, values, onChange, onValuesChange } = source;
  const fieldOf = (item: unknown): unknown => (valueField === undefined ? item : readField(item, valueField));
  return {
    valueOf: (item) => fieldOf(item) as ValueOf<T, F>,
    identityOfValue: (entry) => (valueField === undefined ? keyOf(entry) : valueText(entry)),
    identityOfItem: (item) => (valueField === undefined ? keyOf(item) : valueText(fieldOf(item))),
    itemOfValue: (entry) => (valueField === undefined ? (entry as T) : undefined),
    selected: selectedValues(multi, value, values),
    commit: (next) => (multi ? onValuesChange?.([...next]) : onChange?.(next[0] ?? null)),
  };
};

export { valueBinding };
