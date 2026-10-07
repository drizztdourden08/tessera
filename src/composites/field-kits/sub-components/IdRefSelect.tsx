/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Select } from '../../../primitives/Select';
import { controlName } from '../../../primitives/field-control/control-name';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { IdRefOption } from '../registry.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { SelectOption } from '../../../primitives/Select';
import type { IdRefSelectProps } from './IdRefSelect.type';

const withCurrent = (
  options: readonly IdRefOption[],
  value: string,
  strings: TesseraStrings['records'],
): SelectOption[] => {
  const listed = options.map((option) => ({
    value: option.value,
    label: option.label,
    description: option.description,
  }));
  if (!value || listed.some((option) => option.value === value)) return listed;
  return [{ value, label: value, description: strings.notInCollection }, ...listed];
};

const IdRefSelect = (props: IdRefSelectProps) => {
  const { options, value, placeholder, disabled = false, onChange } = props;
  const { records } = useTesseraStrings();
  const selectOptions = useMemo(() => withCurrent(options, value, records), [options, value, records]);
  return (
    <Select
      {...controlName(props)}
      options={selectOptions}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      searchable
      onChange={onChange}
    />
  );
};

export { IdRefSelect };
