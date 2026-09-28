/* @layer renderer-components @kind data */
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { triggerClass } from './behavior/trigger-class';
import { useSelectDropdown } from './behavior/useSelectDropdown';
import { SelectPanel } from './sub-components/SelectPanel';
import { SelectTrigger } from './sub-components/SelectTrigger';
import type { SelectProps, SelectOption } from './Select.type';
import '../../theme/field-surface.css';
import '../../theme/select-popup.css';
import './Select.css';

const Select = (props: SelectProps) => {
  const {
    value,
    onChange,
    options,
    groups,
    placeholder = 'Select...',
    disabled = false,
    searchable = false,
    size = 'md',
    className = '',
    renderOption,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ownDescribedBy,
  } = props;
  const control = useFieldControl(id, ownDescribedBy);

  const allOptions: SelectOption[] = groups
    ? groups.flatMap((g) => g.options)
    : options ?? [];

  const selectedOption = allOptions.find((o) => o.value === value);

  const dropdown = useSelectDropdown({ disabled, searchable, allOptions, onChange });

  return (
    <>
      <SelectTrigger
        dropdown={dropdown}
        className={triggerClass({ open: dropdown.open, disabled, size, className })}
        disabled={disabled}
        selectedLabel={selectedOption?.label}
        placeholder={placeholder}
        id={control.id}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        ariaDescribedBy={control.describedBy}
      />

      {dropdown.open && (
        <SelectPanel
          dropdown={dropdown}
          searchable={searchable}
          value={value}
          groups={groups}
          allOptions={allOptions}
          renderOption={renderOption}
        />
      )}
    </>
  );
};

export { Select };
