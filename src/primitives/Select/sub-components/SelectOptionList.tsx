/* @layer renderer-components @kind component */
import type { SelectOption } from '../Select.type';
import { SelectItem } from './SelectItem';
import type { SelectOptionListProps } from './SelectOptionList.type';

const SelectOptionList = (props: SelectOptionListProps) => {
  const { dropdown, value, groups, allOptions, renderOption } = props;

  const item = (opt: SelectOption, idx: number) => (
    <SelectItem
      key={opt.value}
      option={opt}
      selected={opt.value === value}
      highlighted={idx === dropdown.highlightIdx}
      idx={idx}
      onSelect={dropdown.handleSelect}
      renderOption={renderOption}
    />
  );

  if (dropdown.search) {
    if (dropdown.filtered.length === 0) return <div className="select-empty">No matches</div>;
    return <>{dropdown.filtered.map((opt, idx) => item(opt, idx))}</>;
  }

  if (groups) {
    return (
      <>
        {groups.map((group, gi) => (
          <div key={group.label}>
            {gi > 0 && <div className="select-separator" />}
            <div className="select-group-label">{group.label}</div>
            {group.options.map((opt) => item(opt, allOptions.indexOf(opt)))}
          </div>
        ))}
      </>
    );
  }

  return <>{allOptions.map((opt, idx) => item(opt, idx))}</>;
};

export { SelectOptionList };
