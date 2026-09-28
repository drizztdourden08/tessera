/* @layer renderer-components @kind component */
import { TagPicker } from '../../../primitives/TagPicker';
import type { TagPickerGroup } from '../../../primitives/TagPicker';
import type { EnumTagSelectProps } from './EnumTagSelect.type';

const EnumTagSelect = (props: EnumTagSelectProps) => {
  const { id, options, selected, onChange, single = false, disabled = false } = props;
  const groups: TagPickerGroup[] = [
    { id, options: options.map((option) => ({ value: option, label: option })) },
  ];
  return (
    <TagPicker
      groups={groups}
      value={[...selected]}
      single={single}
      disabled={disabled}
      onChange={(next) => onChange(next)}
    />
  );
};

export { EnumTagSelect };
