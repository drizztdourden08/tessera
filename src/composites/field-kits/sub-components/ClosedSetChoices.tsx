/* @layer renderer-components @kind component */
import { SegmentedControl } from '../../../primitives/SegmentedControl';
import { controlName } from '../../../primitives/field-control/control-name';
import { EnumTagSelect } from './EnumTagSelect';
import type { ClosedSetChoicesProps } from './EnumEditorControl.type';

const ClosedSetChoices = (props: ClosedSetChoicesProps) => {
  const { field, options, labelOf, current, disabled, onChange, chips } = props;
  const name = controlName(props);
  if (!chips) {
    return (
      <SegmentedControl
        {...name}
        value={current}
        options={options.map((option) => ({ value: option, label: labelOf(option) }))}
        disabled={disabled}
        onChange={onChange}
        onDeselect={field.optional ? () => onChange('') : undefined}
      />
    );
  }
  return (
    <EnumTagSelect
      {...name}
      id={field.path}
      options={options}
      labelOf={labelOf}
      selected={current ? [current] : []}
      disabled={disabled}
      single
      onChange={(selected) => {
        const [next] = selected;
        if (next !== undefined || field.optional) onChange(next ?? '');
      }}
    />
  );
};

export { ClosedSetChoices };
