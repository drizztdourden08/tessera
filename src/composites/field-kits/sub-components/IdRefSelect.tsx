/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Select } from '../../../primitives/Select';
import { DANGLING } from './IdRefSelect.constants';
import type { IdRefOption } from '../registry.type';
import type { SelectOption } from '../../../primitives/Select';
import type { IdRefSelectProps } from './IdRefSelect.type';

const withCurrent = (options: readonly IdRefOption[], value: string): SelectOption[] => {
  const listed = options.map((option) => ({
    value: option.value,
    label: option.label,
    description: option.description,
  }));
  if (!value || listed.some((option) => option.value === value)) return listed;
  return [{ value, label: value, description: DANGLING }, ...listed];
};

const IdRefSelect = (props: IdRefSelectProps) => {
  const { options, value, placeholder, disabled = false, onChange } = props;
  const selectOptions = useMemo(() => withCurrent(options, value), [options, value]);
  return (
    <Select
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
